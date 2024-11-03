import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';
import COLORS from '@/constants/Colors';

type NewChatModalProps = {
    visible: boolean;
    onClose: () => void;
    onCreateChat: (email: string) => void;
};

export default function NewChatModal({
    visible,
    onClose,
    onCreateChat,
}: NewChatModalProps) {
    const [email, setEmail] = useState('');

    const handleCreateChat = () => {
        if (email.trim()) {
            onCreateChat(email);
            setEmail('');
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Rozpocznij nowy czat</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Podaj e-mail użytkownika"
                        placeholderTextColor={COLORS.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={handleCreateChat}
                        >
                            <Text style={styles.createButtonText}>
                                Rozpocznij czat
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Anuluj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        width: '85%',
        padding: 25,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    buttonContainer: {
        width: '100%',
    },
    createButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    createButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ff4444',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
