document.addEventListener('DOMContentLoaded', () => {
    // Existing closeMenuBtn code
    const closeMenuBtn = document.querySelector('.closeMenuBtn');
    
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const topMenu = document.querySelector('.topMenu');
        const menuDetails = document.querySelector('header details');
        const menuList = topMenu.querySelector('ul');
        
        // First, mark as closing to keep it visible
        topMenu.classList.add('closing');
        
        // Animation for topMenu (reverse of menuAnimation)
        const menuAnimation = topMenu.animate([
          { height: menuHeight },
          { height: '0' }
        ], {
          duration: closeAnimationDuration,
          easing: 'ease',
          fill: 'forwards'
        });
        
        // Animation for menuList (reverse of menuListAnimation)
        if (menuList) {
          const listAnimation = menuList.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(-${menuHeight})` }
          ], {
            duration: closeAnimationDuration,
            easing: 'ease',
            fill: 'forwards'
          });
        }
        
        // Wait for animation to complete before closing the menu
        setTimeout(() => {
          if (menuDetails) {
            menuDetails.removeAttribute('open');
          }
          topMenu.classList.remove('closing');
        }, closeAnimationDuration/2);
      });
    }
    
    // New openMenuBtn code
    const openMenuBtn = document.querySelector('header details summary');
    
    if (openMenuBtn) {
      openMenuBtn.addEventListener('click', (e) => {
        // Prevent default toggle behavior
        e.preventDefault();
        
        const topMenu = document.querySelector('.topMenu');
        const menuDetails = document.querySelector('header details');
        
        // Set open attribute immediately to make the menu visible
        if (menuDetails && !menuDetails.hasAttribute('open')) {
          menuDetails.setAttribute('open', '');
          
          // Animation for opening the menu
          const menuAnimation = topMenu.animate([
            { height: '0' },
            { height: menuHeight }
          ], {
            duration: openAnimationDuration,
            easing: 'ease',
            fill: 'forwards'
          });
          
          // Animation for the menu list
          const menuList = topMenu.querySelector('ul');
          if (menuList) {
            const listAnimation = menuList.animate([
              { transform: `translateY(-${menuHeight})` },
              { transform: 'translateY(0)' }
            ], {
              duration: openAnimationDuration,
              easing: 'ease',
              fill: 'forwards'
            });
          }
        }
      });
    }
  });