export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('reveal', (root: HTMLElement) => {
    const obj = '[data-reveal-trigger]';
    if (!document.body.contains(document.querySelector(obj))) return;

    // Add .reveal class on page load
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('reveal');
    });

    const init = (obj: HTMLElement) => {
      const rootMargin = obj.dataset.revealTrigger || '0px 0px -2%';

      const observer = new IntersectionObserver(
        (entries, self) => {
          entries.map((entry) => {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
              if (target.hasAttribute('data-reveal')) {
                target.classList.add('is-active');
              } else {
                target.querySelectorAll('[data-reveal]').forEach((el) => {
                  el.classList.add('is-active');
                });
              }

              self.unobserve(target);
            }
          });
        },
        { root, rootMargin }
      );

      observer.observe(obj);
    };

    document.querySelectorAll(obj).forEach((el) => init(el as HTMLElement));
  });
});
