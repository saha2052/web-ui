import {humanFileSize} from "./HumanFileSize";

export const sizeLabel = (count, type, detail) => {
    switch(type) {
        case "file":
            return humanFileSize(count, detail)
        default:
            const plural = count !== 1 ? 's' : '';
            return count + " " + type + plural;
    }
}
