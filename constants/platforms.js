const platforms = {
    'SFAM': 'SNES',
    'Genesis': 'Mega Drive',
    'DC': 'Dreamcast',
    'NGC': 'Gamecube'
};

export const getPlatform = platform => platforms[platform] || platform;