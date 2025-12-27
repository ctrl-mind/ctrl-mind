/* JavaScript Document

TemplateMo 603 Nexaverse

https://templatemo.com/tm-603-nexaverse

*/

// Loading Screen
window.addEventListener('load', () => {
   setTimeout(() => {
      document.getElementById('loadingScreen').classList.add('hidden');
   }, 1000);
});

// Menu Item Click Handler
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const menuGrid = document.getElementById('menuGrid');
const mainHeader = document.getElementById('mainHeader');
const mainFooter = document.getElementById('mainFooter');
let isTransitioning = false;

menuItems.forEach(item => {
   item.addEventListener('click', () => {
      if (isTransitioning) return;

      const sectionId = item.dataset.section;
      showSection(sectionId);
   });
});

function showSection(sectionId) {
   isTransitioning = true;

   // First, ensure all menu items are in visible state before transitioning
   menuItems.forEach((item) => {
      // Remove initial-load class
      item.classList.remove('initial-load');

      // Set to visible state explicitly
      item.style.opacity = '1';
      item.style.transform = 'translateY(0) scale(1)';
      item.style.animation = 'none';
   });

   // Force reflow to apply the visible state
   void menuGrid.offsetWidth;

   // Now apply staggered fade out transition
   menuItems.forEach((item, index) => {
      setTimeout(() => {
         item.style.transition = 'all 0.4s ease-out';
         item.style.opacity = '0';
         item.style.transform = 'translateY(40px) scale(0.9)';
      }, index * 50);
   });

   // Hide header and footer
   mainHeader.style.animation = 'none';
   mainHeader.style.opacity = '1';
   mainFooter.style.animation = 'none';
   mainFooter.style.opacity = '1';

   void mainHeader.offsetWidth;

   mainHeader.style.transition = 'opacity 0.4s ease';
   mainHeader.style.opacity = '0';
   mainFooter.style.transition = 'opacity 0.4s ease';
   mainFooter.style.opacity = '0';

   // Show content section after menu animation
   setTimeout(() => {
      menuGrid.style.display = 'none';
      mainHeader.style.display = 'none';
      mainFooter.style.display = 'none';

      // Reset menu item styles for next time
      menuItems.forEach(item => {
         item.style.transition = '';
         item.style.opacity = '';
         item.style.transform = '';
         item.classList.remove('exit-up', 'visible');
      });

      const section = document.getElementById(sectionId);
      section.classList.add('active');

      // Animate stats if introduction section
      if (sectionId === 'introduction') {
         setTimeout(animateStats, 500);
      }

      isTransitioning = false;
   }, 550);
}

function backToMenu() {
   if (isTransitioning) return;
   isTransitioning = true;

   const activeSection = document.querySelector('.content-section.active');
   if (activeSection) {
      // Get fixed elements that need to fade out
      const sectionHeaderSmall = activeSection.querySelector('.section-header-small');
      const backBtn = activeSection.querySelector('.back-btn');

      // Step 1: Cancel the forwards animation so we can control opacity
      activeSection.style.animation = 'none';
      activeSection.style.opacity = '1'; // Reset to visible state first

      // Force reflow to apply the animation cancel
      void activeSection.offsetWidth;

      // Step 2: Now apply fade out transition to ALL elements
      activeSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      activeSection.style.opacity = '0';
      activeSection.style.transform = 'translateY(-20px)';

      if (sectionHeaderSmall) {
         sectionHeaderSmall.style.transition = 'opacity 0.5s ease';
         sectionHeaderSmall.style.opacity = '0';
      }
      if (backBtn) {
         backBtn.style.transition = 'opacity 0.5s ease';
         backBtn.style.opacity = '0';
      }

      // Step 3: Wait for complete fade out
      setTimeout(() => {
         // Hide section completely
         activeSection.classList.remove('active');
         activeSection.style.animation = '';
         activeSection.style.opacity = '';
         activeSection.style.transform = '';
         activeSection.style.transition = '';

         if (sectionHeaderSmall) {
            sectionHeaderSmall.style.opacity = '';
            sectionHeaderSmall.style.transition = '';
         }
         if (backBtn) {
            backBtn.style.opacity = '';
            backBtn.style.transition = '';
         }

         // Step 4: Prepare menu elements (hidden initially)
         menuGrid.style.display = 'grid';
         mainHeader.style.display = 'block';
         mainFooter.style.display = 'block';

         // Cancel CSS animations to prevent re-triggering
         mainHeader.style.animation = 'none';
         mainFooter.style.animation = 'none';

         mainHeader.style.opacity = '0';
         mainHeader.style.transform = 'translateY(20px)';
         mainFooter.style.opacity = '0';

         menuItems.forEach(item => {
            item.classList.remove('exit-up', 'initial-load', 'return', 'visible');
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.9)';
         });

         // Step 5: Brief pause then fade in menu
         setTimeout(() => {
            // Fade in header
            mainHeader.style.transition = 'all 0.5s ease';
            mainHeader.style.opacity = '1';
            mainHeader.style.transform = 'translateY(0)';

            // Fade in footer
            mainFooter.style.transition = 'all 0.5s ease';
            mainFooter.style.opacity = '1';

            // Staggered fade in for menu items
            menuItems.forEach((item, index) => {
               setTimeout(() => {
                  item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0) scale(1)';
               }, index * 80);
            });

            // Step 6: Clean up after all animations complete
            setTimeout(() => {
               mainHeader.style.transition = '';
               mainHeader.style.transform = '';
               mainFooter.style.transition = '';

               menuItems.forEach(item => {
                  item.style.transition = '';
                  item.style.opacity = '';
                  item.style.transform = '';
                  item.classList.add('visible');
               });

               isTransitioning = false;
            }, 600);
         }, 150);
      }, 550);
   }
}

// Animate Stats
function animateStats() {
   const metricValues = document.querySelectorAll('.metric-value[data-target]');
   metricValues.forEach((el, index) => {
      setTimeout(() => {
         const target = parseInt(el.dataset.target);
         let current = 0;
         const increment = target / 40;
         const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
               current = target;
               clearInterval(timer);
            }
            el.textContent = Math.floor(current);
         }, 30);
      }, index * 200);
   });
}

// Tab Switching
function switchTab(btn, tabId) {
   document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');

   document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
   document.getElementById(tabId).classList.add('active');
}

// Gallery Filter
function filterGallery(category, btn) {
   document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
   btn.classList.add('active');

   const items = document.querySelectorAll('.gallery-item');
   items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
         item.style.display = 'block';
         item.style.animation = 'tabFade 0.4s ease-out';
      } else {
         item.style.display = 'none';
      }
   });
}




const symbols = ['🔴', '🔵', '🟢', '🟡'];
        let history = [];
        let patterns = {};
        let totalRounds = 0;
        let aiWins = 0;
        let playerWins = 0;
        let currentPrediction = null;

        function predict() {
            if (history.length === 0) {
                return symbols[Math.floor(Math.random() * symbols.length)];
            }

            if (history.length === 1) {
                return symbols[Math.floor(Math.random() * symbols.length)];
            }

            const last = history[history.length - 1];
            const lastTwo = history.slice(-2).join('');
            const lastThree = history.length >= 3 ? history.slice(-3).join('') : null;

            let scores = { '🔴': 0, '🔵': 0, '🟢': 0, '🟡': 0 };

            if (patterns[last]) {
                for (let choice in patterns[last]) {
                    scores[choice] += patterns[last][choice] * 2;
                }
            }

            if (patterns[lastTwo]) {
                for (let choice in patterns[lastTwo]) {
                    scores[choice] += patterns[lastTwo][choice] * 3;
                }
            }

            if (lastThree && patterns[lastThree]) {
                for (let choice in patterns[lastThree]) {
                    scores[choice] += patterns[lastThree][choice] * 4;
                }
            }

            let freq = {};
            history.forEach(h => {
                freq[h] = (freq[h] || 0) + 1;
            });
            for (let s in freq) {
                scores[s] += freq[s] * 0.5;
            }

            let maxScore = Math.max(...Object.values(scores));
            if (maxScore === 0) {
                return symbols[Math.floor(Math.random() * symbols.length)];
            }

            let candidates = symbols.filter(s => scores[s] === maxScore);
            return candidates[Math.floor(Math.random() * candidates.length)];
        }

        function updatePatterns(choice) {
            if (history.length > 0) {
                const last = history[history.length - 1];
                if (!patterns[last]) patterns[last] = {};
                patterns[last][choice] = (patterns[last][choice] || 0) + 1;
            }

            if (history.length >= 2) {
                const lastTwo = history.slice(-2).join('');
                if (!patterns[lastTwo]) patterns[lastTwo] = {};
                patterns[lastTwo][choice] = (patterns[lastTwo][choice] || 0) + 1;
            }

            if (history.length >= 3) {
                const lastThree = history.slice(-3).join('');
                if (!patterns[lastThree]) patterns[lastThree] = {};
                patterns[lastThree][choice] = (patterns[lastThree][choice] || 0) + 1;
            }
        }

        function showPrediction(pred) {
            symbols.forEach((s, i) => {
                const box = document.getElementById(`pred-${i}`);
                box.classList.remove('predicted');
                if (s === pred) {
                    box.classList.add('predicted');
                }
            });
        }

        function play(choice) {
            if (currentPrediction) {
                totalRounds++;
                
                if (currentPrediction === choice) {
                    aiWins++;
                    document.getElementById('result').className = 'result lose';
                    document.getElementById('result').textContent = `AI Wins! It predicted ${choice} correctly! 🎯`;
                } else {
                    playerWins++;
                    document.getElementById('result').className = 'result win';
                    document.getElementById('result').textContent = `You Win! AI predicted ${currentPrediction}, you chose ${choice} 🎉`;
                }

                updatePatterns(choice);
            }

            history.push(choice);
            
            const historyEl = document.getElementById('history');
            const item = document.createElement('span');
            item.className = 'history-item';
            item.textContent = choice;
            item.style.background = 
                choice === '🔴' ? '#ffcdd2' :
                choice === '🔵' ? '#bbdefb' :
                choice === '🟢' ? '#c8e6c9' : '#fff9c4';
            historyEl.appendChild(item);
            historyEl.scrollLeft = historyEl.scrollWidth;

            currentPrediction = predict();
            showPrediction(currentPrediction);

            document.getElementById('rounds').textContent = totalRounds;
            document.getElementById('aiWins').textContent = aiWins;
            document.getElementById('playerWins').textContent = playerWins;
            
            const rate = totalRounds > 0 ? ((aiWins / totalRounds) * 100).toFixed(0) : 0;
            document.getElementById('winRate').textContent = rate + '%';
        }

        function reset() {
            history = [];
            patterns = {};
            totalRounds = 0;
            aiWins = 0;
            playerWins = 0;
            currentPrediction = null;

            document.getElementById('history').innerHTML = '';
            document.getElementById('result').className = 'result waiting';
            document.getElementById('result').textContent = 'Make your first choice to start!';
            document.getElementById('rounds').textContent = '0';
            document.getElementById('aiWins').textContent = '0';
            document.getElementById('playerWins').textContent = '0';
            document.getElementById('winRate').textContent = '0%';

            symbols.forEach((s, i) => {
                document.getElementById(`pred-${i}`).classList.remove('predicted');
            });
        }

        currentPrediction = predict();
        showPrediction(currentPrediction);