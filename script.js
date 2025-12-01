// ============================================================================
// Mobile Menu Toggle
// ============================================================================
function initMobileMenu() {
  const menuBtn = document.querySelector(".navbar-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      const isOpen = mobileMenu.classList.contains("open");
      menuBtn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });
  }
}

// ============================================================================
// Room Data
// ============================================================================
const roomsData = [
  { name: "Study Room A1", capacity: 2, floor: 1, facilities: ["Projector", "Whiteboard", "WiFi", "Air Conditioner"] },
  { name: "Meeting Room B2", capacity: 5, floor: 4, facilities: ["Projector", "Video Conference", "Whiteboard", "WiFi"] },
  { name: "Collaboration Space C1", capacity: 12, floor: 5, facilities: ["Projector", "Whiteboard", "TV Screen", "Air Conditioner", "WiFi", "Microphone", "Video Conference", "Dual Monitors"] },
  { name: "Quiet Study D1", capacity: 2, floor: 2, facilities: ["Whiteboard", "WiFi", "Air Conditioner"] },
  { name: "Seminar Room E1", capacity: 20, floor: 5, facilities: ["Projector", "Microphone", "Sound System", "Video Conference", "TV Screen", "Whiteboard", "WiFi", "Air Conditioner"] },
  { name: "Group Study F1", capacity: 8, floor: 3, facilities: ["TV Screen", "Whiteboard", "WiFi", "Air Conditioner", "Projector"] }
];

// Additional rooms for rooms.html page
const allRoomsData = [
  { name: "Study Room A1", capacity: 2, floor: 1, facilities: ["Projector", "Whiteboard", "WiFi", "Air Conditioner"], image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Meeting Room B2", capacity: 5, floor: 4, facilities: ["Projector", "Video Conference", "Whiteboard", "WiFi"], image: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Collaboration Space C1", capacity: 12, floor: 5, facilities: ["Projector", "Whiteboard", "TV Screen", "Air Conditioner", "WiFi", "Microphone", "Video Conference", "Dual Monitors"], image: "https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Quiet Study D1", capacity: 2, floor: 2, facilities: ["Whiteboard", "WiFi", "Air Conditioner"], image: "https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Seminar Room E1", capacity: 20, floor: 5, facilities: ["Projector", "Microphone", "Sound System", "Video Conference", "TV Screen", "Whiteboard", "WiFi", "Air Conditioner"], image: "https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Group Study F1", capacity: 8, floor: 3, facilities: ["TV Screen", "Whiteboard", "WiFi", "Air Conditioner", "Projector"], image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Private Pod G1", capacity: 3, floor: 2, facilities: ["Monitor", "WiFi", "Air Conditioner"], image: "https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Workshop Room H1", capacity: 10, floor: 4, facilities: ["Projector", "Whiteboard", "Video Conference", "TV Screen"], image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

// ============================================================================
// Filter Panel Toggle & Search (Home Page)
// ============================================================================
function initFilterPanel() {
  const filterBtn = document.querySelector(".filter-btn");
  const filterPanel = document.querySelector(".filter-panel");
  const searchInput = document.getElementById("roomSearch");
  const clearBtn = document.getElementById("filterClearBtn");
  const emptyStateClearBtn = document.getElementById("emptyStateClearBtn");
  const filterOptions = document.querySelectorAll(".filter-option");
  const roomCards = document.querySelectorAll(".room-card");
  const roomsCount = document.getElementById("roomsCount");
  const filterBadge = document.getElementById("filterBadge");
  const emptyState = document.getElementById("emptyState");
  const roomGrid = document.getElementById("roomGrid");
  const viewAllContainer = document.getElementById("viewAllContainer");

  // Store active filters by type
  const activeFilters = {
    capacity: [],
    floor: [],
    facilities: []
  };

  // Panel toggle
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener("click", () => {
      filterPanel.classList.toggle("open");
      filterBtn.classList.toggle("active");
    });
  }

  // Filter options toggle with proper handling
  filterOptions.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.preventDefault();
      const type = opt.dataset.type;
      const value = opt.dataset.value;

      // If "All" is clicked
      if (value === "all") {
        // Remove all filters of this type
        const sameTypeButtons = document.querySelectorAll(`[data-type="${type}"]`);
        sameTypeButtons.forEach(btn => btn.classList.remove("active"));
        opt.classList.add("active");
        activeFilters[type] = [];
      } else {
        // Toggle regular option
        opt.classList.toggle("active");

        // If selecting a non-"all" option, deselect "All"
        const allBtn = document.querySelector(`[data-type="${type}"][data-value="all"]`);
        if (allBtn && opt.classList.contains("active")) {
          allBtn.classList.remove("active");
        }

        // Update activeFilters
        if (opt.classList.contains("active")) {
          if (!activeFilters[type].includes(value)) {
            activeFilters[type].push(value);
          }
        } else {
          activeFilters[type] = activeFilters[type].filter(v => v !== value);
        }

        // If all options are deselected, select "All"
        const sameTypeButtons = document.querySelectorAll(`[data-type="${type}"].filter-option:not([data-value="all"])`);
        const anyActive = Array.from(sameTypeButtons).some(btn => btn.classList.contains("active"));
        if (!anyActive && allBtn) {
          allBtn.classList.add("active");
          activeFilters[type] = [];
        }
      }

      updateClearButtonVisibility();
      applyFiltersAndSearch();
    });
  });

  // Clear filters
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      filterOptions.forEach((opt) => {
        if (opt.dataset.value === "all") {
          opt.classList.add("active");
        } else {
          opt.classList.remove("active");
        }
      });
      activeFilters.capacity = [];
      activeFilters.floor = [];
      activeFilters.facilities = [];
      if (searchInput) searchInput.value = "";
      updateClearButtonVisibility();
      applyFiltersAndSearch();
    });
  }

  // Empty state clear button
  if (emptyStateClearBtn) {
    emptyStateClearBtn.addEventListener("click", () => {
      clearBtn.click();
    });
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", applyFiltersAndSearch);
  }

  // Update clear button visibility
  function updateClearButtonVisibility() {
    const hasActiveFilters = 
      activeFilters.capacity.length > 0 || 
      activeFilters.floor.length > 0 || 
      activeFilters.facilities.length > 0;

    if (clearBtn) {
      clearBtn.style.display = hasActiveFilters ? "" : "none";
    }

    // Update badge
    const totalFilters = 
      activeFilters.capacity.length + 
      activeFilters.floor.length + 
      activeFilters.facilities.length;

    if (filterBadge) {
      if (totalFilters > 0) {
        filterBadge.textContent = totalFilters;
        filterBadge.style.display = "";
      } else {
        filterBadge.style.display = "none";
      }
    }
  }

  // Apply filters and search
  function applyFiltersAndSearch() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    let visibleCount = 0;

    roomCards.forEach((card) => {
      const roomName = card.querySelector(".room-card-name").textContent.toLowerCase();
      const facilityTags = Array.from(card.querySelectorAll(".facility-tag"))
        .map(tag => tag.textContent.trim());
      const capacityText = card.querySelector(".room-card-info-item")?.textContent || "";
      const floorText = card.querySelectorAll(".room-card-info-item")[1]?.textContent || "";

      // Extract actual capacity number
      const capacityMatch = capacityText.match(/(\d+)/);
      const capacity = capacityMatch ? parseInt(capacityMatch[1]) : 0;

      // Check search term
      const matchesSearch = !searchTerm || 
                           roomName.includes(searchTerm) || 
                           facilityTags.some(f => f.toLowerCase().includes(searchTerm));

      // Check filters - ALL filters must pass (AND logic between categories)
      let matchesFilters = true;

      // Check Capacity filter - ANY selected capacity range must match (OR within category)
      if (activeFilters.capacity.length > 0) {
        const capacityMatch = activeFilters.capacity.some(cap => {
          if (cap === "1-3") return capacity >= 1 && capacity <= 3;
          if (cap === "4-6") return capacity >= 4 && capacity <= 6;
          if (cap === "7-10") return capacity >= 7 && capacity <= 10;
          if (cap === "11-14") return capacity >= 11 && capacity <= 14;
          if (cap === "15+") return capacity >= 15;
          return false;
        });
        matchesFilters = matchesFilters && capacityMatch;
      }

      // Check Floor filter - ANY selected floor must match (OR within category)
      if (activeFilters.floor.length > 0) {
        const floorMatch = activeFilters.floor.some(floor => floorText.includes(floor));
        matchesFilters = matchesFilters && floorMatch;
      }

      // Check Facilities filter - room must have ALL selected facilities (AND within category)
      if (activeFilters.facilities.length > 0) {
        const facilitiesMatch = activeFilters.facilities.every(facility => 
          facilityTags.includes(facility)
        );
        matchesFilters = matchesFilters && facilitiesMatch;
      }

      const shouldShow = matchesSearch && matchesFilters;
      card.style.display = shouldShow ? "" : "none";
      if (shouldShow) visibleCount++;
    });

    // Update count text and empty state
    if (roomsCount) {
      if (visibleCount === 0) {
        roomsCount.textContent = "0 rooms available for booking";
      } else {
        roomsCount.textContent = `${visibleCount} room${visibleCount !== 1 ? "s" : ""} available for booking`;
      }
    }

    // Show/hide empty state and view all link
    if (emptyState && roomGrid && viewAllContainer) {
      if (visibleCount === 0) {
        emptyState.style.display = "";
        roomGrid.style.display = "none";
        viewAllContainer.style.display = "none";
      } else {
        emptyState.style.display = "none";
        roomGrid.style.display = "";
        viewAllContainer.style.display = "";
      }
    }
  }

  // Initialize with "All" selected for all filter types
  document.querySelectorAll("[data-value='all']").forEach(btn => {
    btn.classList.add("active");
  });
}

// ============================================================================
// Mobile Filter Modal (Rooms Page)
// ============================================================================
function initMobileFilterModal() {
  const openBtn = document.querySelector(".mobile-filter-open");
  const closeBtn = document.querySelector(".mobile-filter-close");
  const modal = document.querySelector(".mobile-filter-modal");
  const overlay = document.querySelector(".mobile-filter-overlay");
  const clearBtn = document.querySelector(".sidebar-clear-btn");

  // Hide clear button initially
  if (clearBtn) {
    clearBtn.style.display = "none";
  }

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // Helper function to check if any filter is active (not "All")
  const isAnyFilterActive = () => {
    const allBtns = document.querySelectorAll(".sidebar-filter-btn");
    for (let btn of allBtns) {
      const isAll = btn.textContent.trim() === "All";
      if (!isAll && btn.classList.contains("active")) {
        return true;
      }
    }
    
    // Check search input
    const searchInput = document.querySelector(".search-input");
    if (searchInput && searchInput.value.trim()) {
      return true;
    }
    
    return false;
  };

  // Helper function to update clear button visibility
  const updateClearButtonVisibility = () => {
    if (clearBtn) {
      clearBtn.style.display = isAnyFilterActive() ? "" : "none";
    }
  };

  // Sidebar filter buttons - handle mutual exclusivity per group
  const sidebarBtns = document.querySelectorAll(".sidebar-filter-btn");
  sidebarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".sidebar-filter-options");
      if (group) {
        // For capacity, floor, and facilities groups: toggle or set single/multiple
        const label = btn.closest(".sidebar-filter-group")?.querySelector(".sidebar-filter-label")?.textContent || "";
        
        if (label.includes("Facilities")) {
          // Facilities allow multiple selections (AND logic)
          btn.classList.toggle("active");
        } else {
          // Capacity and Floor are single-select
          group.querySelectorAll(".sidebar-filter-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        }
      }
      // Trigger filtering
      updateClearButtonVisibility();
      filterRoomsOnPage();
    });
  });

  // Search input with debounce
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      updateClearButtonVisibility();
      searchTimeout = setTimeout(filterRoomsOnPage, 300);
    });
  }

  // Clear filters button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      // Reset all filters to "All"
      const allBtns = document.querySelectorAll(".sidebar-filter-btn");
      allBtns.forEach(btn => {
        const label = btn.closest(".sidebar-filter-group")?.querySelector(".sidebar-filter-label")?.textContent || "";
        const isAll = btn.textContent.trim() === "All";
        
        if (label.includes("Facilities")) {
          // Keep "All" active for Facilities
          if (isAll) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        } else {
          // For capacity and floor: activate "All" button, deactivate others
          if (isAll) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        }
      });
      
      // Clear search
      if (searchInput) searchInput.value = "";
      
      // Hide clear button and re-filter
      updateClearButtonVisibility();
      filterRoomsOnPage();
    });
  }

  // Empty state clear button
  const emptyStateClearBtn = document.querySelector("#emptyStateClearBtn");
  if (emptyStateClearBtn) {
    emptyStateClearBtn.addEventListener("click", () => {
      clearBtn.click();
    });
  }
}

// ============================================================================
// Filter & Render Rooms on rooms.html page
// ============================================================================
function filterRoomsOnPage() {
  const currentPage = window.location.pathname;
  const isRoomsPage = currentPage.includes("rooms.html");
  if (!isRoomsPage) return;

  const roomGrid = document.querySelector(".room-grid");
  if (!roomGrid) return;

  // Get active filter buttons
  const filterGroups = document.querySelectorAll(".sidebar-filter-group");
  let selectedCapacity = "All";
  let selectedFloor = "All";
  let selectedFacilities = [];

  filterGroups.forEach((group, index) => {
    const label = group.querySelector(".sidebar-filter-label")?.textContent || "";
    const activeBtn = group.querySelector(".sidebar-filter-btn.active");
    
    if (label.includes("Capacity") && activeBtn) {
      selectedCapacity = activeBtn.textContent.trim();
    }
    if (label.includes("Floor") && activeBtn) {
      selectedFloor = activeBtn.textContent.trim();
    }
    if (label.includes("Facilities")) {
      const activeBtns = group.querySelectorAll(".sidebar-filter-btn.active");
      selectedFacilities = Array.from(activeBtns)
        .map(btn => btn.textContent.trim())
        .filter(text => text !== "All"); // Exclude "All" from facilities filter
    }
  });

  // Get search term
  const searchInput = document.querySelector(".search-input");
  const searchTerm = (searchInput?.value || "").toLowerCase();

  // Filter allRoomsData
  const filtered = allRoomsData.filter(room => {
    // Search filter
    if (searchTerm) {
      const matchesName = room.name.toLowerCase().includes(searchTerm);
      const matchesFacility = room.facilities.some(f => f.toLowerCase().includes(searchTerm));
      if (!matchesName && !matchesFacility) return false;
    }

    // Capacity filter (if "All" is selected, pass all rooms)
    if (selectedCapacity !== "All") {
      const cap = getCapacityCategory(room.capacity);
      if (cap !== selectedCapacity) return false;
    }

    // Floor filter (if "All" is selected, pass all rooms)
    if (selectedFloor !== "All") {
      if (`Floor ${room.floor}` !== selectedFloor) return false;
    }

    // Facilities filter (AND logic - room must have ALL selected facilities)
    // If no facilities selected or only "All" is selected, pass all rooms
    if (selectedFacilities.length > 0) {
      for (const facility of selectedFacilities) {
        if (!room.facilities.includes(facility)) return false;
      }
    }

    return true;
  });

  // Update results count
  const resultsCount = document.querySelector(".desktop-results-count");
  const mobileCount = document.querySelector(".mobile-filter-count");
  if (resultsCount) resultsCount.textContent = `Showing ${filtered.length} rooms`;
  if (mobileCount) mobileCount.textContent = `Showing ${filtered.length} rooms`;

  // Handle empty state and render rooms
  const emptyState = document.querySelector(".empty-state");
  if (filtered.length === 0) {
    if (emptyState) emptyState.style.display = "";
    if (roomGrid) roomGrid.style.display = "none";
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (roomGrid) roomGrid.style.display = "";
  }

  // Render rooms
  renderRoomsGrid(filtered, roomGrid);
}

function getCapacityCategory(capacity) {
  if (capacity >= 1 && capacity <= 3) return "1-3 people";
  if (capacity >= 4 && capacity <= 6) return "4-6 people";
  if (capacity >= 7 && capacity <= 10) return "7-10 people";
  if (capacity >= 11 && capacity <= 14) return "11-14 people";
  if (capacity >= 15) return "15+ people";
  return "All";
}

function renderRoomsGrid(rooms, container) {
  container.innerHTML = "";

  if (rooms.length === 0) {
    return;
  }

  rooms.forEach((room, index) => {
    const card = document.createElement("div");
    card.className = "room-card animate-fade-in-up";
    const capacityCategory = getCapacityCategory(room.capacity);
    const firstTwoFacilities = room.facilities.slice(0, 2);
    const moreCount = room.facilities.length - 2;

    // Build facilities HTML
    let facilitiesHTML = firstTwoFacilities
      .map(f => `<span class="facility-tag">${f}</span>`)
      .join("");
    
    if (moreCount > 0) {
      facilitiesHTML += `<span class="facility-tag"><span class="facility-more">+${moreCount} more</span></span>`;
    }

    card.innerHTML = `
      <div class="room-card-image-wrapper">
        <img src="${room.image}" alt="${room.name}" class="room-card-image" />
        <div class="room-card-image-overlay"></div>
        <span class="room-card-available-badge">
          <span class="pulse-dot"></span>
          Available
        </span>
        <span class="room-card-name">${room.name}</span>
      </div>
      <div class="room-card-content">
        <div class="room-card-info">
          <span class="room-card-info-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            ${capacityCategory}
          </span>
          <span class="room-card-info-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
              <path d="M10 6h4" />
              <path d="M10 10h4" />
              <path d="M10 14h4" />
              <path d="M10 18h4" />
            </svg>
            Floor ${room.floor}
          </span>
        </div>
        <div class="room-card-facilities">
          ${facilitiesHTML}
        </div>
        <div class="room-card-actions">
          <a href="room-detail.html" class="btn-ghost">View Details</a>
          <a href="booking.html" class="btn-primary">Book Now</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Setup empty state clear button after rendering
  const emptyStateClearBtn = document.querySelector("#emptyStateClearBtn");
  if (emptyStateClearBtn && !emptyStateClearBtn.dataset.listenerAdded) {
    emptyStateClearBtn.addEventListener("click", () => {
      const clearBtn = document.querySelector(".sidebar-clear-btn");
      if (clearBtn) clearBtn.click();
    });
    emptyStateClearBtn.dataset.listenerAdded = "true";
  }
}

// ============================================================================
// Tabs Component
// ============================================================================
function initTabs() {
  const tabs = document.querySelectorAll(".tabs");

  tabs.forEach((tabGroup) => {
    const tabBtns = tabGroup.querySelectorAll(".tab");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Handle tab content switching
        const tabId = btn.dataset.tab;
        if (tabId) {
          const contents = document.querySelectorAll(".tab-content");
          contents.forEach((c) => c.classList.add("hidden"));
          const activeContent = document.querySelector(`#${tabId}`);
          if (activeContent) activeContent.classList.remove("hidden");
        }
      });
    });
  });
}

// ============================================================================
// Gallery (Room Detail Page)
// ============================================================================
function initGallery() {
  const mainImage = document.querySelector(".room-gallery-main-image");
  const thumbnails = document.querySelectorAll(".thumbnail-btn");
  const prevBtn = document.querySelector(".gallery-nav-btn.prev");
  const nextBtn = document.querySelector(".gallery-nav-btn.next");
  const counter = document.querySelector(".gallery-counter");

  if (!mainImage || thumbnails.length === 0) return;

  let currentIndex = 0;
  const images = Array.from(thumbnails).map((t) => t.querySelector("img").src);

  const updateGallery = (index) => {
    currentIndex = index;
    mainImage.src = images[index];
    thumbnails.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
    if (counter) {
      counter.textContent = `${index + 1} / ${images.length}`;
    }
  };

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => updateGallery(index));
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      updateGallery((currentIndex - 1 + images.length) % images.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      updateGallery((currentIndex + 1) % images.length);
    });
  }
}

// ============================================================================
// Mock room availability data
// Format: "YYYY-MM-DD" -> "available" | "partially" | "fully"
const mockAvailabilityData = {
  // November 2025
  "2025-11-28": "available",
  "2025-11-29": "available",
  "2025-11-30": "partially",
  
  // December 2025
  "2025-12-01": "available",
  "2025-12-02": "available",
  "2025-12-03": "fully",
  "2025-12-04": "available",
  "2025-12-05": "available",
  "2025-12-06": "available",
  "2025-12-07": "partially",
  "2025-12-08": "fully",
  "2025-12-09": "available",
  "2025-12-10": "available",
  "2025-12-11": "available",
  "2025-12-12": "partially",
  "2025-12-13": "available",
  "2025-12-14": "fully",
  "2025-12-15": "available",
  "2025-12-16": "available",
  "2025-12-17": "available",
  "2025-12-18": "available",
  "2025-12-19": "partially",
  "2025-12-20": "available",
  "2025-12-21": "fully",
  "2025-12-22": "available",
  "2025-12-23": "available",
  "2025-12-24": "available",
  "2025-12-25": "fully",
  "2025-12-26": "available",
  "2025-12-27": "available",
  "2025-12-28": "available",
  "2025-12-29": "available",
  "2025-12-30": "partially",
  "2025-12-31": "available",
  
  // January 2026
  "2026-01-01": "fully",
  "2026-01-02": "available",
  "2026-01-03": "available",
  "2026-01-04": "available",
  "2026-01-05": "partially",
  "2026-01-06": "available",
  "2026-01-07": "fully",
  "2026-01-08": "available",
  "2026-01-09": "available",
  "2026-01-10": "available",
};

// Calendar (Room Detail & Booking Pages)
// ============================================================================
function initCalendar() {
  const calendarDaysContainer = document.querySelector(".calendar-days");
  const prevBtn = document.querySelector(".calendar-nav-btn.prev");
  const nextBtn = document.querySelector(".calendar-nav-btn.next");
  const monthLabel = document.querySelector(".calendar-month");

  if (!calendarDaysContainer || !monthLabel) return;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    calendarDaysContainer.innerHTML = "";
    
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const emptyBtn = document.createElement("button");
      emptyBtn.className = "calendar-day";
      emptyBtn.disabled = true;
      calendarDaysContainer.appendChild(emptyBtn);
    }
    
    // Add day buttons
    for (let day = 1; day <= daysInMonth; day++) {
      const btn = document.createElement("button");
      btn.className = "calendar-day";
      btn.textContent = day;
      btn.type = "button";
      
      const dateObj = new Date(currentYear, currentMonth, day);
      dateObj.setHours(0, 0, 0, 0);
      const dateKey = dateObj.toISOString().split('T')[0];
      
      // Check if date is in the past
      if (dateObj < today) {
        btn.classList.add("past");
      } else {
        // Check status from mock data
        const status = mockAvailabilityData[dateKey];
        if (status === "available") {
          btn.classList.add("available");
        } else if (status === "partially") {
          btn.classList.add("partial");
        } else if (status === "fully") {
          btn.classList.add("full");
        }
      }
      
      calendarDaysContainer.appendChild(btn);
    }
    
    monthLabel.textContent = `${months[currentMonth]} ${currentYear}`;
  };

  // Initial render
  renderCalendar();

  // Navigation handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }
}

// ============================================================================
// Time Slots (Booking Page)
// ============================================================================
function initTimeSlots() {
  const slots = document.querySelectorAll(".time-slot.available");
  const selectedSlotsDisplay = document.querySelector(".selection-summary-value");
  let selectedSlots = [];

  slots.forEach((slot) => {
    slot.addEventListener("click", () => {
      slot.classList.toggle("selected");

      const time = slot.textContent.trim();
      if (slot.classList.contains("selected")) {
        selectedSlots.push(time);
      } else {
        selectedSlots = selectedSlots.filter((t) => t !== time);
      }

      if (selectedSlotsDisplay) {
        selectedSlotsDisplay.textContent =
          selectedSlots.length > 0
            ? `${selectedSlots.length} slot${selectedSlots.length > 1 ? "s" : ""} selected`
            : "None selected";
      }
    });
  });
}

// ============================================================================
// Multi-Step Form (Booking Page)
// ============================================================================
let formAlertContainer = null; // Global alert container for form validation

function createFormAlertContainer() {
  if (!formAlertContainer) {
    formAlertContainer = document.createElement('div');
    formAlertContainer.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
    document.body.appendChild(formAlertContainer);
  }
  return formAlertContainer;
}

function showFormAlert(message) {
  const container = createFormAlertContainer();
  const alert = document.createElement('div');
  alert.style.cssText = `
    background: rgba(30, 30, 50, 0.95);
    border-left: 4px solid rgb(251, 191, 36);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 0.95rem;
    animation: slideIn 0.3s ease-out;
  `;
  
  const icon = document.createElement('span');
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(251, 191, 36)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  `;
  
  const text = document.createElement('span');
  text.textContent = message;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `;
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
    display: flex;
    align-items: center;
  `;
  closeBtn.addEventListener('click', function() {
    alert.remove();
  });
  
  alert.appendChild(icon);
  alert.appendChild(text);
  alert.appendChild(closeBtn);
  container.appendChild(alert);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    alert.remove();
  }, 4000);
}

function initMultiStepForm() {
  const steps = document.querySelectorAll(".booking-step");
  const stepContents = document.querySelectorAll(".step-content");
  const stepLines = document.querySelectorAll(".booking-step-line");
  const nextBtns = document.querySelectorAll(".btn-next-step");
  const prevBtns = document.querySelectorAll(".btn-prev-step");

  let currentStep = 0;

  const updateStep = (newStep) => {
    // Update step indicators
    steps.forEach((step, i) => {
      step.classList.remove("active", "completed");
      if (i < newStep) step.classList.add("completed");
      if (i === newStep) step.classList.add("active");
    });

    // Update step lines
    stepLines.forEach((line, i) => {
      line.classList.toggle("completed", i < newStep);
    });

    // Update step content
    stepContents.forEach((content, i) => {
      content.classList.toggle("hidden", i !== newStep);
    });

    currentStep = newStep;

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Special validation for Step 3 (Details form)
      if (currentStep === 2) { // Step 3 is index 2 (0, 1, 2, 3)
        // Get all form elements
        const step3 = document.getElementById('step-3');
        const inputs = step3.querySelectorAll('input');
        const selects = step3.querySelectorAll('select');
        
        // Get values by their order
        const fullName = inputs[0].value.trim();
        const studentId = inputs[1].value.trim();
        const email = inputs[2].value.trim();
        
        const roomType = selects[0].value;
        const purpose = selects[1].value;
        const attendees = selects[2].value;
        
        // Check fields one by one - if any fails, show alert and return immediately
        if (!fullName) {
          showFormAlert('Please enter Full Name');
          return;
        }
        
        if (!studentId) {
          showFormAlert('Please enter Student/Staff ID');
          return;
        }
        
        if (!email) {
          showFormAlert('Please enter Email');
          return;
        }
        
        if (!roomType) {
          showFormAlert('Please select Room Type');
          return;
        }
        
        if (!purpose) {
          showFormAlert('Please select Purpose of Booking');
          return;
        }
        
        if (!attendees) {
          showFormAlert('Please select Number of Attendees');
          return;
        }
        
        // If all validations pass, continue to next step
      }
      
      if (currentStep < steps.length - 1) {
        updateStep(currentStep + 1);
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        updateStep(currentStep - 1);
      }
    });
  });

  // Room selection
  const roomItems = document.querySelectorAll(".room-selection-item");
  roomItems.forEach((item) => {
    item.addEventListener("click", () => {
      roomItems.forEach((r) => r.classList.remove("selected"));
      item.classList.add("selected");
    });
  });
}

// ============================================================================
// Modal Component
// ============================================================================
function initModals() {
  const modalTriggers = document.querySelectorAll("[data-modal-open]");
  const modalCloses = document.querySelectorAll("[data-modal-close]");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.dataset.modalOpen;
      const modal = document.querySelector(`#${modalId}`);
      if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  modalCloses.forEach((close) => {
    close.addEventListener("click", () => {
      const modal = close.closest(".modal-overlay");
      if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });

  // Close on overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });
}

// ============================================================================
// Confetti Animation (Success Page)
// ============================================================================
function initConfetti() {
  const container = document.querySelector(".confetti-container");
  if (!container) return;

  const colors = ["#c4f82a", "#10b981", "#fbbf24", "#ef4444", "#8b5cf6", "#3b82f6"];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + "s";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

    const size = Math.random() * 8 + 6;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    container.appendChild(confetti);
  }

  // Remove confetti after animation
  setTimeout(() => {
    container.innerHTML = "";
  }, 5000);
}

// ============================================================================
// FAQ Accordion
// ============================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        // Close all others
        faqItems.forEach((i) => i.classList.remove("open"));
        // Toggle current
        if (!wasOpen) {
          item.classList.add("open");
        }
      });
    }
  });
}

// ============================================================================
// Booking Search (My Bookings Page)
// ============================================================================
function initBookingSearch() {
  const searchForm = document.querySelector(".email-search-form");
  const bookingsList = document.querySelector(".bookings-list");
  const emptyState = document.querySelector(".empty-state");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = searchForm.querySelector("input").value;

      // Mock: Show bookings if email contains @
      if (email.includes("@")) {
        if (bookingsList) bookingsList.classList.remove("hidden");
        if (emptyState) emptyState.classList.add("hidden");
      } else {
        if (bookingsList) bookingsList.classList.add("hidden");
        if (emptyState) emptyState.classList.remove("hidden");
      }
    });
  }
}

// ============================================================================
// Booking Page - Room and Date Selection
// ============================================================================
const bookingState = {
  selectedRoom: null,
  selectedDate: null,
};

function initBookingPage() {
  // Initialize room selection grid
  const roomGrid = document.getElementById("room-selection-grid");
  if (roomGrid) {
    roomsData.forEach(room => {
      const roomItem = document.createElement("button");
      roomItem.className = "room-selection-item";
      roomItem.type = "button";
      roomItem.innerHTML = `
        <img src="${room.image}" alt="${room.name}" class="room-selection-image" />
        <div class="room-selection-name">${room.name}</div>
        <div class="room-selection-info">
          <span>👥 ${room.capacity} people</span>
          <span>📍 Floor ${room.floor}</span>
        </div>
      `;
      
      roomItem.addEventListener("click", (e) => {
        e.preventDefault();
        selectRoom(room, roomItem);
      });
      
      roomGrid.appendChild(roomItem);
    });
  }

  // Initialize calendar for booking page
  initBookingCalendar();
}

function selectRoom(room, element) {
  // Update selected state
  document.querySelectorAll(".room-selection-item").forEach(item => {
    item.classList.remove("selected");
  });
  element.classList.add("selected");
  
  // Update booking state
  bookingState.selectedRoom = room;
  
  // Show selected room summary
  const display = document.getElementById("selected-room-display");
  const nameEl = document.getElementById("selected-room-name");
  const detailsEl = document.getElementById("selected-room-details");
  
  if (display && nameEl && detailsEl) {
    nameEl.textContent = room.name;
    detailsEl.innerHTML = `
      <span>👥 ${room.capacity} people</span>
      <span>📍 Floor ${room.floor}</span>
    `;
    display.style.display = "block";
  }
}

function initBookingCalendar() {
  const calendarDaysContainer = document.querySelector("#step-1 .calendar-days");
  const prevBtn = document.querySelector("#step-1 .calendar-nav-btn.prev");
  const nextBtn = document.querySelector("#step-1 .calendar-nav-btn.next");
  const monthLabel = document.querySelector("#step-1 .calendar-month");

  if (!calendarDaysContainer || !monthLabel) return;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    calendarDaysContainer.innerHTML = "";
    
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const emptyBtn = document.createElement("button");
      emptyBtn.className = "calendar-day";
      emptyBtn.disabled = true;
      calendarDaysContainer.appendChild(emptyBtn);
    }
    
    // Add day buttons
    for (let day = 1; day <= daysInMonth; day++) {
      const btn = document.createElement("button");
      btn.className = "calendar-day";
      btn.textContent = day;
      btn.type = "button";
      
      const dateObj = new Date(currentYear, currentMonth, day);
      dateObj.setHours(0, 0, 0, 0);
      const dateKey = dateObj.toISOString().split('T')[0];
      
      // Check if date is in the past
      if (dateObj < today) {
        btn.classList.add("past");
        btn.disabled = true;
      } else {
        // Check status from mock data
        const status = mockAvailabilityData[dateKey];
        if (status === "available") {
          btn.classList.add("available");
        } else if (status === "partially") {
          btn.classList.add("partial");
        } else if (status === "fully") {
          btn.classList.add("full");
        }
        
        // Add click handler
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          selectDate(dateObj, btn);
        });
      }
      
      // Check if this is the currently selected date
      if (bookingState.selectedDate && dateKey === bookingState.selectedDate.toISOString().split('T')[0]) {
        btn.classList.add("selected");
      }
      
      calendarDaysContainer.appendChild(btn);
    }
    
    monthLabel.textContent = `${months[currentMonth]} ${currentYear}`;
  };

  // Initial render
  renderCalendar();

  // Navigation handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }
}

function selectDate(dateObj, element) {
  // Update selected state on all calendar buttons
  document.querySelectorAll("#step-1 .calendar-day").forEach(btn => {
    btn.classList.remove("selected");
  });
  element.classList.add("selected");
  
  // Update booking state
  bookingState.selectedDate = dateObj;
  
  // Update display
  const dateKey = dateObj.toISOString().split('T')[0];
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  
  const display = document.getElementById("selected-date-display");
  if (display) {
    display.textContent = `${dayName}, ${monthName} ${day}, ${year}`;
  }
}

// ============================================================================
// Initialize Date and Time Selects (Home Page)
// ============================================================================
function initializeDateTimeSelects() {
  const dateSelect = document.getElementById("quickSearchDate");
  // const timeSelect = document.getElementById("quickSearchTime");

  // Populate dates (next 7 days)
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const option = document.createElement("option");
    option.value = date.toISOString().split("T")[0];
    option.textContent = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    dateSelect.appendChild(option);
  }

  // Populate times (8:00 - 21:00)
  // for (let hour = 8; hour <= 16; hour++) {
  //   const option = document.createElement("option");
  //   const time = `${hour.toString().padStart(2, "0")}:00`;
  //   option.value = time;
  //   option.textContent = time;
  //   timeSelect.appendChild(option);
  // }
}

// ============================================================================
// Initialize All
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initFilterPanel();
  initMobileFilterModal();
  initTabs();
  initGallery();
  initCalendar();
  initTimeSlots();
  initMultiStepForm();
  initModals();
  initFaqAccordion();
  initBookingSearch();
  initializeDateTimeSelects();

  // Initialize booking page (booking.html)
  const currentPage = window.location.pathname;
  if (currentPage.includes("booking.html")) {
    initBookingPage();
  }

  // Initialize room filtering for rooms.html page
  if (currentPage.includes("rooms.html")) {
    filterRoomsOnPage(); // Initial render with all rooms
  }

  // Initialize confetti only for booking-success.html
  if (currentPage.includes("booking-success.html")) {
    initConfetti();
  }
});