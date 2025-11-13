import { useEffect, useRef, useState, useCallback } from "react";

export interface UseObserverOptions extends IntersectionObserverInit {
  /**
   * Trigger callback only once when element enters view
   * @default false
   */
  triggerOnce?: boolean;

  /**
   * Enable the observer (useful for conditional observation)
   * @default true
   */
  enabled?: boolean;

  /**
   * Callback when element enters viewport
   */
  onEnter?: (entry: IntersectionObserverEntry) => void;

  /**
   * Callback when element leaves viewport
   */
  onLeave?: (entry: IntersectionObserverEntry) => void;

  /**
   * Callback on any intersection change
   */
  onChange?: (entry: IntersectionObserverEntry) => void;
}

export interface UseObserverReturn {
  /**
   * Ref to attach to the element you want to observe
   */
  ref: React.RefObject<HTMLElement>;

  /**
   * Current intersection observer entry
   */
  entry: IntersectionObserverEntry | null;

  /**
   * Whether the element is currently visible in viewport
   */
  isVisible: boolean;

  /**
   * Whether the element is fully visible (100% intersecting)
   */
  isFullyVisible: boolean;

  /**
   * Whether the element is partially visible
   */
  isPartiallyVisible: boolean;

  /**
   * Current intersection ratio (0 to 1)
   */
  intersectionRatio: number;

  /**
   * Whether the element has ever been visible
   */
  hasBeenVisible: boolean;

  /**
   * Number of times element has entered viewport
   */
  enterCount: number;

  /**
   * Number of times element has left viewport
   */
  leaveCount: number;

  /**
   * Manually disconnect the observer
   */
  disconnect: () => void;

  /**
   * Manually reconnect the observer
   */
  reconnect: () => void;
}

/**
 * Comprehensive Intersection Observer hook for detecting element visibility
 *
 * @example
 * // Basic usage - detect when element enters view
 * const { ref, isVisible } = useObserver();
 *
 * @example
 * // Trigger animation once when element enters
 * const { ref, isVisible } = useObserver({
 *   triggerOnce: true,
 *   threshold: 0.5,
 *   onEnter: () => console.log('Element entered!')
 * });
 *
 * @example
 * // Track scroll position with callbacks
 * const { ref, intersectionRatio } = useObserver({
 *   threshold: [0, 0.25, 0.5, 0.75, 1],
 *   onChange: (entry) => console.log('Visibility:', entry.intersectionRatio)
 * });
 *
 * @example
 * // Lazy load with rootMargin
 * const { ref, isVisible } = useObserver({
 *   rootMargin: '100px', // Start loading 100px before element enters
 *   triggerOnce: true
 * });
 */
export function useObserver(
  options: UseObserverOptions = {}
): UseObserverReturn {
  const {
    root = null,
    rootMargin = "0px",
    threshold = 0,
    triggerOnce = false,
    enabled = true,
    onEnter,
    onLeave,
    onChange,
  } = options;

  const ref = useRef<HTMLElement>(null!);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [enterCount, setEnterCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  // Track previous visibility state to detect enter/leave
  const prevIsVisibleRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  // Store callbacks in refs to avoid recreating observer
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);
  const onChangeRef = useRef(onChange);

  // Update callback refs when they change
  useEffect(() => {
    onEnterRef.current = onEnter;
    onLeaveRef.current = onLeave;
    onChangeRef.current = onChange;
  }, [onEnter, onLeave, onChange]);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const reconnect = useCallback(() => {
    if (!ref.current || !enabled) return;

    disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyVisible = entry.isIntersecting;
        const wasVisible = prevIsVisibleRef.current;

        setEntry(entry);
        setIsVisible(isCurrentlyVisible);
        setIntersectionRatio(entry.intersectionRatio);

        // Track if element has ever been visible
        if (isCurrentlyVisible) {
          setHasBeenVisible(true);
        }

        // Detect enter event
        if (isCurrentlyVisible && !wasVisible) {
          setEnterCount((prev) => prev + 1);
          onEnterRef.current?.(entry);
        }

        // Detect leave event
        if (!isCurrentlyVisible && wasVisible) {
          setLeaveCount((prev) => prev + 1);
          onLeaveRef.current?.(entry);
        }

        // General change callback
        onChangeRef.current?.(entry);

        // Update previous state
        prevIsVisibleRef.current = isCurrentlyVisible;

        // Disconnect if triggerOnce and element is visible
        if (triggerOnce && isCurrentlyVisible && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observerRef.current.observe(ref.current);
  }, [root, rootMargin, threshold, enabled, triggerOnce, disconnect]);

  useEffect(() => {
    if (!enabled) {
      disconnect();
      return;
    }

    reconnect();

    return () => {
      disconnect();
    };
  }, [enabled, reconnect, disconnect]);

  // Computed properties
  const isFullyVisible = intersectionRatio === 1;
  const isPartiallyVisible = intersectionRatio > 0 && intersectionRatio < 1;

  return {
    ref,
    entry,
    isVisible,
    isFullyVisible,
    isPartiallyVisible,
    intersectionRatio,
    hasBeenVisible,
    enterCount,
    leaveCount,
    disconnect,
    reconnect,
  };
}

// ============= ADDITIONAL SPECIALIZED HOOKS =============

/**
 * Hook for lazy loading images or components
 */
export function useLazyLoad(
  options: Omit<UseObserverOptions, "triggerOnce"> = {}
) {
  return useObserver({
    ...options,
    triggerOnce: true,
    rootMargin: options.rootMargin || "50px", // Start loading slightly before entering view
  });
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation(options: UseObserverOptions = {}) {
  return useObserver({
    threshold: 0.1,
    ...options,
  });
}

/**
 * Hook for infinite scroll implementation
 */
export function useInfiniteScroll(
  callback: () => void,
  options: Omit<UseObserverOptions, "onEnter"> = {}
) {
  return useObserver({
    ...options,
    rootMargin: options.rootMargin || "200px",
    onEnter: callback,
  });
}

/**
 * Hook for tracking element visibility percentage
 */
export function useVisibilityPercentage(
  onVisibilityChange?: (percentage: number) => void,
  options: Omit<UseObserverOptions, "threshold" | "onChange"> = {}
) {
  return useObserver({
    ...options,
    threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0%, 1%, 2%, ..., 100%
    onChange: (entry) => {
      const percentage = Math.round(entry.intersectionRatio * 100);
      onVisibilityChange?.(percentage);
    },
  });
}

/**
 * Hook for parallax effects based on scroll position
 */
export function useParallax(options: UseObserverOptions = {}) {
  const observer = useObserver({
    threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0, 0.05, 0.1, ..., 1
    ...options,
  });

  // Calculate parallax offset based on intersection ratio
  const getParallaxOffset = (speed: number = 0.5) => {
    return (1 - observer.intersectionRatio) * speed * 100;
  };

  return {
    ...observer,
    getParallaxOffset,
  };
}
