import { metaFor, trackedGet } from '@glimmer/tracking';
import { CURRENT_TAG } from '@glimmer/reference';
import GlimmerComponent from '../addon/-private/component';
import { assert } from '@glimmer/util';
export default class Component extends GlimmerComponent {
    constructor() {
        super(...arguments);
        /**
         * Development-mode only name of the component, useful for debugging.
         */
        this.debugName = null;
    }
    get args() {
        trackedGet(this, 'args');
        return this.__args__;
    }
    set args(args) {
        this.__args__ = args;
        metaFor(this)
            .updatableTagFor('args')
            .inner.update(CURRENT_TAG);
    }
    toString() {
        return `${this.debugName} component`;
    }
    /*
     * Legacy DOM access and lifecycle hooks. These will be deprecated in favor
     * of render modifiers once Glimmer.js supports an element modifier manager
     * API.
     */
    /**
     * Called when the component has been inserted into the DOM.
     * Override this function to do any set up that requires an element in the document body.
     */
    didInsertElement() { }
    /**
     * Called when the component has updated and rerendered itself.
     * Called only during a rerender, not during an initial render.
     */
    didUpdate() { }
    /**
     * The element corresponding to the main element of the component's template.
     * The main element is the element in the template that has `...attributes` set on it:
     *
     * ```hbs
     * <h1>Modal</h1>
     * <div class="contents" ...attributes>
     *   {{yield}}
     * </div>
     * ```
     *
     * In this example, `this.element` would be the `div` with the class `contents`.
     *
     * You should not try to access this property until after the component's `didInsertElement()`
     * lifecycle hook is called.
     */
    get element() {
        let { bounds } = this;
        assert(bounds && bounds.firstNode === bounds.lastNode, `The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes.`);
        return bounds.firstNode;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvQGdsaW1tZXIvY29tcG9uZW50L3NyYy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakQsT0FBTyxnQkFBZ0IsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3ZDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGdCQUFxQjtJQUE1RDs7UUFrQkU7O1dBRUc7UUFDSCxjQUFTLEdBQWtCLElBQUksQ0FBQztJQThIbEMsQ0FBQztJQWxKQyxJQUFJLElBQUk7UUFDTixVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDVixlQUFlLENBQUMsTUFBTSxDQUFDO2FBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQVlELFFBQVE7UUFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7OztPQUlHO0lBRUg7OztPQUdHO0lBQ0gsZ0JBQWdCLEtBQUksQ0FBQztJQUVyQjs7O09BR0c7SUFDSCxTQUFTLEtBQUksQ0FBQztJQWdGZDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxJQUFJLE9BQU87UUFDVCxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE1BQU0sQ0FDSixNQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUM5QyxnTEFBZ0wsQ0FDakwsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLFNBQXdCLENBQUM7SUFDekMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWV0YUZvciwgdHJhY2tlZEdldCB9IGZyb20gJ0BnbGltbWVyL3RyYWNraW5nJztcbmltcG9ydCB7IENVUlJFTlRfVEFHIH0gZnJvbSAnQGdsaW1tZXIvcmVmZXJlbmNlJztcblxuaW1wb3J0IEdsaW1tZXJDb21wb25lbnQgZnJvbSAnLi4vYWRkb24vLXByaXZhdGUvY29tcG9uZW50JztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ0BnbGltbWVyL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvdW5kcyB7XG4gIGZpcnN0Tm9kZTogTm9kZTtcbiAgbGFzdE5vZGU6IE5vZGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCBleHRlbmRzIEdsaW1tZXJDb21wb25lbnQ8YW55PiB7XG4gIGdldCBhcmdzKCkge1xuICAgIHRyYWNrZWRHZXQodGhpcywgJ2FyZ3MnKTtcbiAgICByZXR1cm4gdGhpcy5fX2FyZ3NfXztcbiAgfVxuXG4gIHNldCBhcmdzKGFyZ3MpIHtcbiAgICB0aGlzLl9fYXJnc19fID0gYXJncztcbiAgICBtZXRhRm9yKHRoaXMpXG4gICAgICAudXBkYXRhYmxlVGFnRm9yKCdhcmdzJylcbiAgICAgIC5pbm5lci51cGRhdGUoQ1VSUkVOVF9UQUcpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlXG4gICAqIFNsb3Qgb24gdGhlIGNvbXBvbmVudCB0byBzYXZlIEFyZ3VtZW50cyBvYmplY3QgcGFzc2VkIHRvIHRoZSBgYXJnc2Agc2V0dGVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfX2FyZ3NfXzogYW55O1xuXG4gIC8qKlxuICAgKiBEZXZlbG9wbWVudC1tb2RlIG9ubHkgbmFtZSBvZiB0aGUgY29tcG9uZW50LCB1c2VmdWwgZm9yIGRlYnVnZ2luZy5cbiAgICovXG4gIGRlYnVnTmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuZGVidWdOYW1lfSBjb21wb25lbnRgO1xuICB9XG5cbiAgLypcbiAgICogTGVnYWN5IERPTSBhY2Nlc3MgYW5kIGxpZmVjeWNsZSBob29rcy4gVGhlc2Ugd2lsbCBiZSBkZXByZWNhdGVkIGluIGZhdm9yXG4gICAqIG9mIHJlbmRlciBtb2RpZmllcnMgb25jZSBHbGltbWVyLmpzIHN1cHBvcnRzIGFuIGVsZW1lbnQgbW9kaWZpZXIgbWFuYWdlclxuICAgKiBBUEkuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGluc2VydGVkIGludG8gdGhlIERPTS5cbiAgICogT3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiB0byBkbyBhbnkgc2V0IHVwIHRoYXQgcmVxdWlyZXMgYW4gZWxlbWVudCBpbiB0aGUgZG9jdW1lbnQgYm9keS5cbiAgICovXG4gIGRpZEluc2VydEVsZW1lbnQoKSB7fVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyB1cGRhdGVkIGFuZCByZXJlbmRlcmVkIGl0c2VsZi5cbiAgICogQ2FsbGVkIG9ubHkgZHVyaW5nIGEgcmVyZW5kZXIsIG5vdCBkdXJpbmcgYW4gaW5pdGlhbCByZW5kZXIuXG4gICAqL1xuICBkaWRVcGRhdGUoKSB7fVxuXG4gIC8qKlxuICAgKiBDb250YWlucyB0aGUgZmlyc3QgYW5kIGxhc3QgRE9NIG5vZGVzIG9mIGEgY29tcG9uZW50J3MgcmVuZGVyZWQgdGVtcGxhdGUuXG4gICAqIFRoZXNlIG5vZGVzIGNhbiBiZSB1c2VkIHRvIHRyYXZlcnNlIGFsbCBvZiB0aGUgRE9NIG5vZGVzIHRoYXQgYmVsb25nIHRvIGFcbiAgICogcGFydGljdWxhciBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBhIGNvbXBvbmVudCdzIGZpcnN0IGFuZCBsYXN0IG5vZGVzICpjYW4qIGNoYW5nZSBvdmVyIHRpbWUsIGlmIHRoZVxuICAgKiBiZWdpbm5pbmcgb3IgZW5kaW5nIG9mIHRoZSB0ZW1wbGF0ZSBpcyBkeW5hbWljLiBZb3Ugc2hvdWxkIGFsd2F5cyBhY2Nlc3NcbiAgICogYGJvdW5kc2AgZGlyZWN0bHkgYXQgdGhlIHRpbWUgYSBub2RlIGlzIG5lZWRlZCB0byBlbnN1cmUgeW91IGFyZSBhY3Rpbmcgb25cbiAgICogdXAtdG8tZGF0ZSBub2Rlcy5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVzXG4gICAqXG4gICAqIEZvciBjb21wb25lbnRzIHdpdGggYSBzaW5nbGUgcm9vdCBlbGVtZW50LCBgdGhpcy5ib3VuZHMuZmlyc3ROb2RlYCBhbmRcbiAgICogYHRoaXMuYm91bmRzLmxhc3ROb2RlYCBhcmUgdGhlIHNhbWUuXG4gICAqXG4gICAqIGBgYGhic1xuICAgKiA8ZGl2IGNsYXNzPVwidXNlci1wcm9maWxlXCI+XG4gICAqICAgPEF2YXRhciBAdXNlcj17e3VzZXJ9fSAvPlxuICAgKiA8L2Rpdj5cbiAgICogYGBgXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICogICBkaWRJbnNlcnRFbGVtZW50KCkge1xuICAgKiAgICAgbGV0IHsgZmlyc3ROb2RlLCBsYXN0Tm9kZSB9ID0gdGhpcy5ib3VuZHM7XG4gICAqICAgICBjb25zb2xlLmxvZyhmaXJzdE5vZGUgPT09IGxhc3ROb2RlKTsgLy8gdHJ1ZVxuICAgKiAgICAgY29uc29sZS5sb2coZmlyc3ROb2RlLmNsYXNzTmFtZSk7IC8vIFwidXNlci1wcm9maWxlXCJcbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEZvciBjb21wb25lbnRzIHdpdGggbXVsdGlwbGUgcm9vdCBub2RlcywgYHRoaXMuYm91bmRzLmZpcnN0Tm9kZWAgcmVmZXJzIHRvXG4gICAqIHRoZSBmaXJzdCBub2RlIGluIHRoZSB0ZW1wbGF0ZSBhbmQgYHRoaXMuYm91bmRzLmxhc3ROb2RlYCByZWZlcnMgdG8gdGhlXG4gICAqIGxhc3Q6XG4gICAqXG4gICAqIGBgYGhic1xuICAgKiBXZWxjb21lIHRvIEdsaW1tZXIuanMhXG4gICAqIDxzcGFuPkxldCdzIGJ1aWxkIHNvbWUgY29tcG9uZW50cyE8L3NwYW4+XG4gICAqIDxpbWcgc3JjPVwibG9nby5wbmdcIj5cbiAgICogYGBgXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICogICBkaWRJbnNlcnRFbGVtZW50KCkge1xuICAgKiAgICAgbGV0IHsgZmlyc3ROb2RlLCBsYXN0Tm9kZSB9ID0gdGhpcy5ib3VuZHM7XG4gICAqXG4gICAqICAgICAvLyBXYWxrIGFsbCBvZiB0aGUgRE9NIHNpYmxpbmdzIGZyb20gdGhlXG4gICAqICAgICAvLyBmaXJzdE5vZGUgdG8gdGhlIGxhc3ROb2RlIGFuZCBwdXNoIHRoZWlyXG4gICAqICAgICAvLyBub2RlTmFtZSBpbnRvIGFuIGFycmF5LlxuICAgKiAgICAgbGV0IG5vZGUgPSBmaXJzdE5vZGU7XG4gICAqICAgICBsZXQgbmFtZXMgPSBbZmlyc3ROb2RlLm5vZGVOYW1lXTtcbiAgICogICAgIGRvIHtcbiAgICogICAgICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAqICAgICAgIG5hbWVzLnB1c2gobm9kZS5ub2RlTmFtZSk7XG4gICAqICAgICB9IHdoaWxlIChub2RlICE9PSBsYXN0Tm9kZSk7XG4gICAqXG4gICAqICAgICBjb25zb2xlLmxvZyhuYW1lcyk7XG4gICAqICAgICAvLyBbXCIjdGV4dFwiLCBcIlNQQU5cIiwgXCJJTUdcIl1cbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFRoZSBib3VuZHMgY2FuIGNoYW5nZSBpZiB0aGUgdGVtcGxhdGUgaGFzIGR5bmFtaWMgY29udGVudCBhdCB0aGUgYmVnaW5uaW5nXG4gICAqIG9yIHRoZSBlbmQ6XG4gICAqXG4gICAqIGBgYGhic1xuICAgKiB7eyNpZiB1c2VyLmlzQWRtaW59fVxuICAgKiAgIDxzcGFuIGNsYXNzPVwid2FybmluZ1wiPkFkbWluPC9zcGFuPlxuICAgKiB7e2Vsc2V9fVxuICAgKiAgIE5vcm1hbCBVc2VyXG4gICAqIHt7L2lmfX1cbiAgICogYGBgXG4gICAqXG4gICAqIEluIHRoaXMgZXhhbXBsZSwgdGhlIGBmaXJzdE5vZGVgIHdpbGwgY2hhbmdlIGJldHdlZW4gYSBgc3BhbmAgZWxlbWVudCBhbmQgYVxuICAgKiBgVGV4dE5vZGVgIGFzIHRoZSBgdXNlci5pc0FkbWluYCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgKi9cbiAgYm91bmRzOiBCb3VuZHM7XG5cbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIG1haW4gZWxlbWVudCBvZiB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUuXG4gICAqIFRoZSBtYWluIGVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgaW4gdGhlIHRlbXBsYXRlIHRoYXQgaGFzIGAuLi5hdHRyaWJ1dGVzYCBzZXQgb24gaXQ6XG4gICAqXG4gICAqIGBgYGhic1xuICAgKiA8aDE+TW9kYWw8L2gxPlxuICAgKiA8ZGl2IGNsYXNzPVwiY29udGVudHNcIiAuLi5hdHRyaWJ1dGVzPlxuICAgKiAgIHt7eWllbGR9fVxuICAgKiA8L2Rpdj5cbiAgICogYGBgXG4gICAqXG4gICAqIEluIHRoaXMgZXhhbXBsZSwgYHRoaXMuZWxlbWVudGAgd291bGQgYmUgdGhlIGBkaXZgIHdpdGggdGhlIGNsYXNzIGBjb250ZW50c2AuXG4gICAqXG4gICAqIFlvdSBzaG91bGQgbm90IHRyeSB0byBhY2Nlc3MgdGhpcyBwcm9wZXJ0eSB1bnRpbCBhZnRlciB0aGUgY29tcG9uZW50J3MgYGRpZEluc2VydEVsZW1lbnQoKWBcbiAgICogbGlmZWN5Y2xlIGhvb2sgaXMgY2FsbGVkLlxuICAgKi9cbiAgZ2V0IGVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIGxldCB7IGJvdW5kcyB9ID0gdGhpcztcbiAgICBhc3NlcnQoXG4gICAgICBib3VuZHMgJiYgYm91bmRzLmZpcnN0Tm9kZSA9PT0gYm91bmRzLmxhc3ROb2RlLFxuICAgICAgYFRoZSAnZWxlbWVudCcgcHJvcGVydHkgY2FuIG9ubHkgYmUgYWNjZXNzZWQgb24gY29tcG9uZW50cyB0aGF0IGNvbnRhaW4gYSBzaW5nbGUgcm9vdCBlbGVtZW50IGluIHRoZWlyIHRlbXBsYXRlLiBUcnkgdXNpbmcgJ2JvdW5kcycgaW5zdGVhZCB0byBhY2Nlc3MgdGhlIGZpcnN0IGFuZCBsYXN0IG5vZGVzLmBcbiAgICApO1xuICAgIHJldHVybiBib3VuZHMuZmlyc3ROb2RlIGFzIEhUTUxFbGVtZW50O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50RmFjdG9yeSB7XG4gIGNyZWF0ZShpbmplY3Rpb25zOiBvYmplY3QpOiBDb21wb25lbnQ7XG59XG4iXX0=