/**
 * Course Data Array
 * Stores the list of required courses for the Web and Computer Programming certificate.
 * Each object contains course metadata including code, name, credit value, technologies used,
 * and completion status.
 */
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program design and development.',
        technology: ['Python'],
        completed: true // Mark as true if you have completed the course
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to simple software principles.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students write functions with parameters and return values.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the concepts of object-oriented programming.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn to create dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

/**
 * DOM Element References
 * Selecting target containers and interactive elements from the HTML DOM.
 */
const container = document.getElementById('courses-container'); // Grid/flex container where cards render
const totalCreditsEl = document.querySelector('#total-credits span'); // Target <span> displaying total credits
const filterButtons = document.querySelectorAll('.filter-buttons button'); // NodeList of all filter buttons

/**
 * Renders course cards dynamically and updates the total credit count.
 * @param {Array} filteredCourses - Array of course objects to be displayed.
 */
function displayCourses(filteredCourses) {
    // Clear existing HTML content before rendering the new list
    container.innerHTML = '';

    // Loop through the provided array and build card elements dynamically
    filteredCourses.forEach(course => {
        const div = document.createElement('div');
        
        // Dynamically assign styling class based on completion status
        div.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
        
        // Populate card inner HTML content
        div.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
            <span class="status">${course.completed ? 'Completed' : 'In Progress'}</span>
        `;
        
        // Append card to the DOM container
        container.appendChild(div);
    });

    // Calculate total required credits for currently displayed courses using Array.reduce()
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    
    // Update total credits display in the DOM
    totalCreditsEl.textContent = totalCredits;
}

/**
 * Updates button active states to highlight the currently selected filter.
 * @param {HTMLElement} activeBtn - The button element that was clicked.
 */
function setActiveButton(activeBtn) {
    // Remove active class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove('filter-active'));
    
    // Add active class to clicked button
    activeBtn.classList.add('filter-active');
}

/**
 * Filter Event Listeners
 * Handles user click events to filter course list view (All, CSE, WDD).
 */

// Filter: Display All Courses
document.getElementById('all-btn').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

// Filter: Display CSE Courses Only
document.getElementById('cse-btn').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(course => course.subject === 'CSE'));
});

// Filter: Display WDD Courses Only
document.getElementById('wdd-btn').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(course => course.subject === 'WDD'));
});

/**
 * Initial Render
 * Displays all courses by default when the page first loads.
 */
displayCourses(courses);