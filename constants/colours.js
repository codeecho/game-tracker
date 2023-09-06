import { ABANDONED, BACKLOG, COMPLETED, NEXT_UP, OTHER, PLAYING, TO_TRY, WISH_LIST, SHELVED, PLAYED, ALL } from "./states";

export const stateColours = {
    [WISH_LIST]: 'primary',
    [TO_TRY]: 'success',
    [BACKLOG]: 'secondary',
    [PLAYING]: 'info',
    [COMPLETED]: 'light',
    [ABANDONED]: 'danger',
    [OTHER]: 'dark',
    [SHELVED]: 'warning',
    [PLAYED]: 'warning',
    [ALL]: 'dark'
}