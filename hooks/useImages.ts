export const useImages = () => {
    // Eagerly load all images from subfolders
    const staffModules = import.meta.glob('../images/staff/*.webp', { eager: true });
    const buildingModules = import.meta.glob('../images/building/*.webp', { eager: true });
    const studentModules = import.meta.glob('../images/students/*.webp', { eager: true });

    const getImagesValues = (modules: Record<string, any>) =>
        Object.values(modules).map((mod: any) => mod.default);

    const staffImages = getImagesValues(staffModules);
    const buildingImages = getImagesValues(buildingModules);
    const studentImages = getImagesValues(studentModules);

    // Create a map for name-based lookup
    const allModules = { ...staffModules, ...buildingModules, ...studentModules };

    // Helper to get image by fuzzy name
    const getImage = (partialName: string) => {
        const entry = Object.entries(allModules).find(([path]) =>
            path.toLowerCase().includes(partialName.toLowerCase())
        );
        return entry ? (entry[1] as any).default : undefined;
    };

    // Helper to get random subset
    const getRandom = (arr: string[], count: number) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return {
        staff: staffImages,
        building: buildingImages,
        students: studentImages,
        getImage,
        getAll: () => [...staffImages, ...buildingImages, ...studentImages],
        getAllGallery: () => [...studentImages], // Only students, staff and buildings excluded as requested
        getRandomStaff: (count = 4) => getRandom(staffImages, count),
        getRandomBuilding: (count = 4) => getRandom(buildingImages, count),
        getRandomStudents: (count = 4) => getRandom(studentImages, count),
    };
};
