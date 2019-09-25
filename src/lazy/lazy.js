export const lazy = fn => {
    let created = false;
    let value;
    return () => {
        if (!created) {
            value = fn();
            created = true;
        }
        return value;
    };
};
