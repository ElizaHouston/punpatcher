export type PunishmentCategory = {
    short: string;
    name?: string;
    deprecated?: boolean;
    message?: string;
    level?: number;
    scale?: Exclude<PunishmentAction, "KICK" | "WARN">;
    requiredRank?: Rank;
    ordinal?: number;
    displayMaterial?: string
}

export type PunishmentCategoryPatch = {
    short: string;
    name?: string;
    deprecated?: boolean;
    message?: string;
    level?: number;
    scale?: Exclude<PunishmentAction, "KICK" | "WARN">;
    requiredRank?: Rank;
    ordinal?: number;
    displayMaterial?: string
}

export enum Rank {
    ADMIN = "ADMIN",
    SR_MOD = "SR_MOD",
    MOD = "MOD",
    SUPER_HELPER = "SUPER_HELPER",
    HELPER = "HELPER"
}

export enum PunishmentAction {
    WARN = "WARN",
    KICK = "KICK",
    MUTE = "MUTE",
    BAN = "BAN",
    LOBBY_BAN = "LOBBY_BAN",
}

export const patchToCategory = (patch: PunishmentCategoryPatch): PunishmentCategory => {
    return {
        short: patch.short,
        name: patch.name || patch.short,
        deprecated: patch.deprecated || false,
        message: patch.message || "Requires Message",
        level: patch.level || 0,
        scale: patch.scale || PunishmentAction.MUTE,
        requiredRank: patch.requiredRank,
        ordinal: patch.ordinal || 1,
        displayMaterial: patch.displayMaterial || "FEATHER",
    }
}
