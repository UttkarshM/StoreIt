// redux/hooks.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from './store'; // adjust path if needed

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
