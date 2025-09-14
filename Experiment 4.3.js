// booking.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory seat store
// Keys are seat IDs (strings) to match examples in screenshots.
const seats = {};

// initialize seats 1..10 as available
for (let i = 1; i <= 10; i++) {
  seats[String(i)] = {
    status: 'available',   // 'available' | 'locked' | 'booked'
    lockedBy: null,        // optional identifier (e.g. user id)
    lockTimeout: null,     // Node timeout id for auto-expiry
    lockExpiresAt: null    // timestamp when lock expires
  };
}

const LOCK_DURATION_MS = 60 * 1000; // 1 minute

// Helper: release a lock (used by timeout or manual)
function releaseLock(seatId) {
  const s = seats[seatId];
  if (!s) return;
  if (s.lockTimeout) {
    clearTimeout(s.lockTimeout);
    s.lockTimeout = null;
  }
  s.status = 'available';
  s.lockedBy = null;
  s.lockExpiresAt = null;
}

app.get('/seats', (req, res) => {
    const out = {};
  for (const id of Object.keys(seats)) {
    const s = seats[id];
    out[id] = {
      status: s.status,
      lockedBy: s.lockedBy,
      lockExpiresAt: s.lockExpiresAt
    };
  }
  res.json(out);
});

// POST /lock/:id  -> lock a seat for the caller
// Optional JSON body: { "user": "someUserId" }
app.post('/lock/:id', (req, res) => {
  const seatId = String(req.params.id);
  const user = req.body && req.body.user ? String(req.body.user) : 'anonymous';

  const seat = seats[seatId];
  if (!seat) return res.status(404).json({ message: `Seat ${seatId} not found` });

  if (seat.status === 'booked') {
    return res.status(400).json({ message: `Seat ${seatId} is already booked` });
  }

  if (seat.status === 'locked') {
    return res.status(400).json({ message: `Seat ${seatId} is already locked` });
  }

  // lock the seat
  seat.status = 'locked';
  seat.lockedBy = user;
  seat.lockExpiresAt = Date.now() + LOCK_DURATION_MS;

  // set timeout to auto-release lock after LOCK_DURATION_MS
  seat.lockTimeout = setTimeout(() => {
    // double-check seat still locked and by same user
    if (seat && seat.status === 'locked') {
      releaseLock(seatId);
      console.log(`Lock expired for seat ${seatId}`);
    }
  }, LOCK_DURATION_MS);

  res.json({ message: `Seat ${seatId} locked successfully. Confirm within ${LOCK_DURATION_MS / 1000} seconds.` });
});

// POST /confirm/:id -> confirm (book) a locked seat
// Optional JSON body: { "user": "someUserId" }
app.post('/confirm/:id', (req, res) => {
  const seatId = String(req.params.id);
  const user = req.body && req.body.user ? String(req.body.user) : 'anonymous';
  const seat = seats[seatId];

  if (!seat) return res.status(404).json({ message: `Seat ${seatId} not found` });

  if (seat.status !== 'locked') {
    return res.status(400).json({ message: 'Seat is not locked and cannot be booked' });
  }

  // Optionally enforce same user must confirm
  if (seat.lockedBy && seat.lockedBy !== user) {
    return res.status(400).json({ message: `Seat is locked by another user (${seat.lockedBy}).` });
  }

  // confirm booking
  if (seat.lockTimeout) {
    clearTimeout(seat.lockTimeout);
    seat.lockTimeout = null;
  }
  seat.status = 'booked';
  seat.lockedBy = user;
  seat.lockExpiresAt = null;

  res.json({ message: `Seat ${seatId} booked successfully!` });
});

// Optional: POST /unlock/:id -> manual unlock (e.g. admin or cancel)
app.post('/unlock/:id', (req, res) => {
  const seatId = String(req.params.id);
  const seat = seats[seatId];
  if (!seat) return res.status(404).json({ message: `Seat ${seatId} not found` });

  if (seat.status !== 'locked') {
    return res.status(400).json({ message: `Seat ${seatId} is not locked` });
  }

  releaseLock(seatId);
  res.json({ message: `Seat ${seatId} unlocked` });
});

app.get('/', (req, res) => {
  res.send('Concurrent Ticket Booking API. Try GET /seats, POST /lock/:id, POST /confirm/:id');
});

app.listen(port, () => {
  console.log(`Booking server listening at http://localhost:${port}`);
});
