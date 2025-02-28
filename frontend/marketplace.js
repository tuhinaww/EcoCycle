// JavaScript for tab switching, filtering, and other functionality
document.addEventListener('DOMContentLoaded', function () {
  const browseTab = document.getElementById('browseTab');
  const sellTab = document.getElementById('sellTab');
  const myItemsTab = document.getElementById('myItemsTab');

  const browseSection = document.getElementById('browseSection');
  const sellSection = document.getElementById('sellSection');

  // Create my listings section if it doesn't exist
  let myItemsSection = document.getElementById('myItemsSection');
  if (!myItemsSection) {
    myItemsSection = document.createElement('div');
    myItemsSection.id = 'myItemsSection';
    myItemsSection.className = 'hidden';
    myItemsSection.innerHTML = `
      <div class="text-center py-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-[#1c2621] rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#9eb7a9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-white text-xl font-bold mb-2">No Items Listed Yet</h3>
        <p class="text-[#9eb7a9] mb-6">You haven't listed any items for sale in the marketplace.</p>
        <button id="startSellingBtn" class="bg-[#1fe06f] text-[#111714] text-sm font-bold px-4 py-2 rounded-lg">Start Selling</button>
      </div>
    `;
    browseSection.parentNode.appendChild(myItemsSection);
  }

  // Tab switching logic
  browseTab.addEventListener('click', function () {
    setActiveTab(browseTab);
    hideAllSections();
    browseSection.classList.remove('hidden');
  });

  sellTab.addEventListener('click', function () {
    setActiveTab(sellTab);
    hideAllSections();
    sellSection.classList.remove('hidden');
  });

  myItemsTab.addEventListener('click', function () {
    setActiveTab(myItemsTab);
    hideAllSections();
    myItemsSection.classList.remove('hidden');
  });

  // Handle "Start Selling" button in My Listings tab
  const startSellingBtn = document.getElementById('startSellingBtn');
  if (startSellingBtn) {
    startSellingBtn.addEventListener('click', function () {
      setActiveTab(sellTab);
      hideAllSections();
      sellSection.classList.remove('hidden');
    });
  }

  function setActiveTab(activeTab) {
    // Remove active class from all tabs
    [browseTab, sellTab, myItemsTab].forEach((tab) => {
      tab.classList.remove('text-[#1fe06f]', 'border-b-2', 'border-[#1fe06f]');
      tab.classList.add('text-white', 'hover:text-[#1fe06f]');
    });

    // Add active class to the clicked tab
    activeTab.classList.remove('text-white', 'hover:text-[#1fe06f]');
    activeTab.classList.add('text-[#1fe06f]', 'border-b-2', 'border-[#1fe06f]');
  }

  function hideAllSections() {
    // Hide all sections
    browseSection.classList.add('hidden');
    sellSection.classList.add('hidden');
    myItemsSection.classList.add('hidden');
  }

  // Sell item form submission
  const sellItemForm = document.getElementById('sellItemForm');
  if (sellItemForm) {
    sellItemForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('itemTitle').value;
      const price = document.getElementById('itemPrice').value;
      const category = document.getElementById('itemCategory').value;

      if (!title || !price || !category) {
        alert('Please fill out all fields');
        return;
      }

      // Show success message
      alert('Item listed successfully!');
      sellItemForm.reset();
    });
  }
});