"use client";

import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/state/slices/authSlice";
import { storage } from "@/state/services/storage";
import { useRouter, usePathname } from "next/navigation";

// Set timeout to 15 minutes (in milliseconds)
const LOGOUT_TIMEOUT = 15 * 60 * 1000;

export const useAutoLogout = () => {
    const dispatch = useDispatch<any>(); // Type as any for now to avoid strict thunk issues if types aren't perfect
    const router = useRouter();
    const pathname = usePathname();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const performLogout = useCallback(() => {
        if (storage.getToken()) {
            dispatch(logoutUser());
            router.push("/auth/signin");
        }
    }, [dispatch, router]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Only set timer if user is authenticated (checking token presence)
        if (storage.getToken()) {
            timerRef.current = setTimeout(() => {
                performLogout();
            }, LOGOUT_TIMEOUT);
        }
    }, [performLogout]);

    useEffect(() => {
        // Events to track activity
        const events = [
            "mousedown",
            "mousemove",
            "keydown",
            "scroll",
            "touchstart",
        ];

        const handleActivity = () => {
            resetTimer();
        };

        // Initialize timer
        resetTimer();

        // Add event listeners
        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [resetTimer, pathname]); // Reset on path change too? Maybe not strictly necessary to reset on nav, but safe.

    return null;
};
