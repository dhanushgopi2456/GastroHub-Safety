import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // --- Real-time Socket.io Logic ---
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-order", (orderId) => {
      socket.join(`order-${orderId}`);
      console.log(`Socket ${socket.id} joined order-${orderId}`);
    });

    socket.on("update-location", (data) => {
      // Simulate rider movement
      const { orderId, location, eta } = data;
      io.to(`order-${orderId}`).emit("rider-tracking", { location, eta });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // --- API Routes ---
  
  // Mock Database state
  const restaurants = [
    {
      id: "1",
      name: "Neo Tokyo Eats",
      cuisine: "Japanese Fusion",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      description: "Modern sushi with a cyberpunk twist.",
      avgPrice: 1200,
      tags: ["Trending", "AI Recommended", "Dine-in Available"]
    },
    {
      id: "2",
      name: "The Italian Garden",
      cuisine: "Authentic Italian",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
      coordinates: { lat: 12.9720, lng: 77.5950 },
      description: "Organic pasta and wood-fired pizzas.",
      avgPrice: 800,
      tags: ["Family Friendly", "Classic", "Vegetarian Selection"]
    },
    {
      id: "3",
      name: "Spice Route",
      cuisine: "Indian Royal",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
      coordinates: { lat: 12.9700, lng: 77.5930 },
      description: "Luxury dining experience from the heart of Delhi.",
      avgPrice: 2000,
      tags: ["Fine Dining", "Luxury", "Must Visit"]
    },
    {
      id: "4",
      name: "Cyber Ramen Box",
      cuisine: "Ramen",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
      coordinates: { lat: 12.9750, lng: 77.5980 },
      description: "Automated ramen synthesis for the busy corporate soul.",
      avgPrice: 450,
      tags: ["Quick", "Tech-Forward", "Late Night"]
    },
    {
      id: "5",
      name: "Zen Garden Sushi",
      cuisine: "Japanese",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800",
      coordinates: { lat: 12.9800, lng: 77.6000 },
      description: "Peaceful dining in a holographic garden.",
      avgPrice: 1500,
      tags: ["Quiet", "Date Night", "Premium"]
    },
    {
      id: "6",
      name: "The Under-Grid",
      cuisine: "Molecular",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
      coordinates: { lat: 12.9650, lng: 77.5850 },
      description: "Industrial chic with experimental textures.",
      avgPrice: 3500,
      tags: ["Experimental", "Social", "Top Rated"]
    }
  ];

  app.get("/api/restaurants", (req, res) => {
    res.json(restaurants);
  });

  app.post("/api/reservations", (req, res) => {
    const { restaurantId, userId, date, time, guests } = req.body;
    // In production, save to MongoDB
    res.json({ status: "success", reservationId: Math.random().toString(36).substr(2, 9) });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // --- Vite / Static Handling ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`[GastroHub Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
