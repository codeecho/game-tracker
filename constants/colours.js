import { ABANDONED, BACKLOG, COMPLETED, NEXT_UP, OTHER, PLAYING, TO_TRY, WISH_LIST } from "./states";

export const stateColours = {
    [WISH_LIST]: 'primary',
    [TO_TRY]: 'success',
    [BACKLOG]: 'secondary',
    [PLAYING]: 'warning',
    [COMPLETED]: 'light',
    [ABANDONED]: 'danger',
    [OTHER]: 'info'
}