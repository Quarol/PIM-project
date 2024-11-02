import COLORS from '@/constants/Colors';

const FONTS = {
    title: {
        fontSize: 24,
        fontWeight: 'bold' as const,
        color: COLORS.textPrimary,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: COLORS.textPrimary,
    },
    body: {
        fontSize: 16,
        fontWeight: 'normal' as const,
        color: COLORS.textSecondary,
    },
    small: {
        fontSize: 14,
        fontWeight: 'normal' as const,
        color: COLORS.textSecondary,
    },
    button: {
        fontSize: 16,
        fontWeight: 'bold' as const,
        color: COLORS.white,
    },
};

export default FONTS;
