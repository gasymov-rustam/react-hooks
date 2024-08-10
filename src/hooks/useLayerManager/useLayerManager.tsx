import { useContext, useEffect, useMemo } from 'react';
import { useEvent } from '../useEvent/useEvent';
import { LayerContext, LayerManager } from './LayerManager';

interface UseLayerManagerProps {
  elementRef: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  outsideClickEnabled?: boolean;
  onOutsideClick: (event: MouseEvent | TouchEvent) => void;
}

export const useLayerManager = ({
  elementRef,
  triggerRef,
  outsideClickEnabled = true,
  onOutsideClick,
}: UseLayerManagerProps) => {
  const layer = useMemo(() => new LayerManager(elementRef, triggerRef), [elementRef, triggerRef]);
  const parentLayer = useContext(LayerContext);

  useEffect(() => {
    if (!parentLayer) {
      return;
    }

    return parentLayer.registerChild(layer);
  }, [parentLayer, layer]);

  const handleOutsideClick = useEvent(onOutsideClick);

  useEffect(() => {
    if (!outsideClickEnabled) {
      return;
    }

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!e.target) {
        return;
      }

      if (layer.isOutsideClick(e.target)) {
        handleOutsideClick(e);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [handleOutsideClick, layer, outsideClickEnabled]);

  function renderLayer(children: React.ReactNode) {
    return <LayerContext.Provider value={layer}>{children}</LayerContext.Provider>;
  }

  return { renderLayer };
};
