import { createContext } from 'react';

export class LayerManager {
  private children: LayerManager[] = [];
  private elementRef: React.RefObject<HTMLElement>;
  private triggerRef?: React.RefObject<HTMLElement>;

  constructor(elementRef: React.RefObject<HTMLElement>, triggerRef?: React.RefObject<HTMLElement>) {
    this.elementRef = elementRef;
    this.triggerRef = triggerRef;
  }

  registerChild(child: LayerManager) {
    this.children.push(child);

    return () => {
      const index = this.children.indexOf(child);

      if (index === -1) {
        return;
      }

      this.children.splice(index, 1);
    };
  }

  isOutsideClick(target: EventTarget): boolean {
    if (!this.elementRef.current || !(target instanceof Node)) {
      return true;
    }

    const ignoreElements = [this.elementRef.current];

    if (this.triggerRef?.current) {
      ignoreElements.push(this.triggerRef.current);
    }

    const clickedInside = ignoreElements.some((element) => element.contains(target));

    if (clickedInside) {
      return false;
    }

    const clickOutsideOfChildLayers = this.children.every((child) => child.isOutsideClick(target));

    if (clickOutsideOfChildLayers) {
      return true;
    }

    return false;
  }
}

export const LayerContext = createContext<LayerManager | null>(null);
