import { ABANDONED, BACKLOG, COMPLETED, NEXT_UP, PLAYING, WISH_LIST } from "./states";

export const stateColours = {
    [WISH_LIST]: 'primary',
    [BACKLOG]: 'secondary',
    [NEXT_UP]: 'success',
    [PLAYING]: 'warning',
    [COMPLETED]: 'light',
    [ABANDONED]: 'danger'
}