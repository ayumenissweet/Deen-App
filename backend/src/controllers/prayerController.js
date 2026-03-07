import prisma from "../config/db.js";

// Utility: get start of today
const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// -----------------------------
// Mark prayer completed
// -----------------------------
export const completePrayer = async (req, res) => {
  const { prayer } = req.body;
  const userId = req.user.id;

  try {
    const today = getTodayDate();

    const existing = await prisma.prayerCompletion.findFirst({
      where: {
        userId,
        prayer,
        date: today,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Prayer already completed today",
      });
    }

    const completion = await prisma.prayerCompletion.create({
      data: {
        prayer,
        date: today,
        completed: true,
        userId,
      },
    });

    res.json({
      message: "Prayer marked completed",
      completion,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// -----------------------------
// Get today's prayer progress
// -----------------------------
export const getTodayPrayers = async (req, res) => {
  const userId = req.user.id;

  try {
    const today = getTodayDate();

    const prayers = await prisma.prayerCompletion.findMany({
      where: {
        userId,
        date: today,
      },
    });

    const result = {
      FAJR: false,
      DHUHR: false,
      ASR: false,
      MAGHRIB: false,
      ISHA: false,
    };

    prayers.forEach((p) => {
      result[p.prayer] = true;
    });

    const completed = Object.values(result).filter(Boolean).length;
    const progress = (completed / 5) * 100;

    res.json({
      prayers: result,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// -----------------------------
// Get prayer history
// -----------------------------
export const getPrayerHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await prisma.prayerCompletion.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 50,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
