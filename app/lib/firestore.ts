import { collection, doc, setDoc, addDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// Prices configuration
const CYLINDER_PRICES: Record<string, number> = {
  "14.2kg Domestic": 850,
  "19kg Commercial": 1950,
  "5kg Chhotu": 550,
  "10kg-fiber": 750,
};

export const getCylinderPrice = (type: string): number => {
  return CYLINDER_PRICES[type] || 0;
};

export const createUserProfile = async (data: {
  uid: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  connectionType: "Domestic" | "Commercial";
}) => {
  const userRef = doc(db, "users", data.uid);
  await setDoc(userRef, {
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    connectionType: data.connectionType,
    createdAt: serverTimestamp(),
  });
};

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  connectionType: "Domestic" | "Commercial";
  createdAt?: any;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return null;
  return { uid, ...snap.data() } as UserProfile;
};

export const updateUserProfile = async (
  uid: string,
  updates: Partial<Pick<UserProfile, "name" | "phone" | "address">>
): Promise<void> => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const createBooking = async (data: {
  userId: string;
  cylinderType: string;
  address: string;
  paymentMethod: string;
  amount: number;
  status: string;
  paymentStatus: string;
  adminStatus: string;
}) => {
  const bookingRef = await addDoc(collection(db, "booking-cylinder"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return bookingRef.id;
};


export interface Booking {
  id: string;
  userId: string;
  cylinderType: string;
  address: string;
  paymentMethod: string;
  amount: number;
  status: string;
  paymentStatus: string;
  adminStatus: string;
  createdAt: any;
}

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  // Simple implementation to avoid complex queries without composite indexes initially
  const { query, where, getDocs } = await import("firebase/firestore");
  const q = query(
    collection(db, "booking-cylinder"),
    where("userId", "==", userId)
  );
  
  const querySnapshot = await getDocs(q);
  const bookings: Booking[] = [];
  querySnapshot.forEach((doc) => {
    bookings.push({ id: doc.id, ...doc.data() } as Booking);
  });
  
  // Sort by date descending (client-side to avoid needing a composite index immediately)
  return bookings.sort((a, b) => {
    const timeA = a.createdAt?.toMillis?.() || 0;
    const timeB = b.createdAt?.toMillis?.() || 0;
    return timeB - timeA;
  });
};

export const getCylinderIcon = (type: string) => {
  if (type.includes("14.2")) return "🏠";
  if (type.includes("19")) return "🏢";
  if (type.includes("Chhotu") || type.includes("5kg")) return "🎒";
  if (type.includes("fiber")) return "🧴";
  return "🔥";
};

export const formatBookingDate = (timestamp: any) => {
  if (!timestamp) return "Pending...";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const getPaymentLabel = (method: string) => {
  const map: Record<string, string> = {
    cash: "Cash on Delivery",
    upi: "UPI / QR Code",
    card: "Credit / Debit Card",
  };
  return map[method] || method;
};


