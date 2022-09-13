const platforms = {
    'SFAM': 'SNES',
    'Genesis': 'Mega Drive',
    'DC': 'Dreamcast',
    'NGC': 'Gamecube',
    'Linux': 'PC',
    'DOS': 'PC'
};

export const getPlatform = platform => platforms[platform] || platform;