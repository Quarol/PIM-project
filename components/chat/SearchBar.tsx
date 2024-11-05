import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import COLORS from '@/constants/Colors';

type SearchBarProps = {
    searchText: string;
    onSearch: (text: string) => void;
};

export default function SearchBar({ searchText, onSearch }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Szukaj po e-mailu..."
                value={searchText}
                onChangeText={onSearch}
                placeholderTextColor={COLORS.textSecondary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: COLORS.background,
    },
    input: {
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: '#DDD',
    },
});
