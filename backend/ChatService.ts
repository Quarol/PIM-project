import {
    collection,
    addDoc,
    doc,
    getDocs,
    setDoc,
    query,
    where,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';

export async function getOrCreateChat(
    userEmail: string,
    otherUserEmail: string,
) {
    const chatsRef = collection(FIREBASE_DB, 'chats');
    const q = query(chatsRef, where('users', 'array-contains', userEmail));
    let chatId = null;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.users.includes(otherUserEmail)) {
            chatId = doc.id;
        }
    });

    if (chatId) return chatId;

    const newChat = await addDoc(chatsRef, {
        users: [userEmail, otherUserEmail],
        lastMessage: '',
        lastMessageTimestamp: null,
    });

    return newChat.id;
}

export function subscribeToChats(
    userEmail: string,
    callback: (chats: any[]) => void,
) {
    const chatsRef = collection(FIREBASE_DB, 'chats');
    const q = query(
        chatsRef,
        where('users', 'array-contains', userEmail),
        orderBy('lastMessageTimestamp', 'desc'),
    );

    return onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(chats);
    });
}

export function subscribeToMessages(
    chatId: string,
    callback: (messages: any[]) => void,
) {
    const messagesRef = collection(FIREBASE_DB, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(messages);
    });
}

export async function sendMessage(
    chatId: string,
    text: string,
    senderEmail: string,
) {
    const messagesRef = collection(FIREBASE_DB, `chats/${chatId}/messages`);
    await addDoc(messagesRef, {
        text,
        senderEmail,
        timestamp: serverTimestamp(),
    });

    const chatRef = doc(FIREBASE_DB, 'chats', chatId);
    await setDoc(
        chatRef,
        {
            lastMessage: text,
            lastMessageTimestamp: serverTimestamp(),
        },
        { merge: true },
    );
}
