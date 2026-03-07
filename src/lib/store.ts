import { Store } from "@tanstack/react-store";

// STORES ----------------------------------------------------------------------------------------------------------------------------------
export const store = new Store<State>({ headerHoveredId: undefined, isScrolled: false });

// METHODS ---------------------------------------------------------------------------------------------------------------------------------
export function setHeaderHoveredId(id?: string) {
  store.setState((state) => ({ ...state, headerHoveredId: id }));
}

export function setIsScrolled(isScrolled: boolean) {
  store.setState((state) => ({ ...state, isScrolled }));
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type State = { headerHoveredId?: string; isScrolled: boolean };
