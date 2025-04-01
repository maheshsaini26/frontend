document.addEventListener("DOMContentLoaded", function () {
    let leftSection = document.querySelector(".left-section");
    let rightSection = document.querySelector(".right-section");
    let footer = document.querySelector(".footer");
    
    let stopPoint = footer.offsetTop - leftSection.offsetHeight - 980; // Stop before footer
    
    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;

        if (scrollY < stopPoint) {
            leftSection.style.transform = `translateY(${scrollY}px)`;
            rightSection.style.transform = `translateY(${scrollY}px)`;
        } else {
            leftSection.style.transform = `translateY(${stopPoint}px)`;
            rightSection.style.transform = `translateY(${stopPoint}px)`;
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
});

function fetchJobs() {
    fetch('http://localhost:5000/jobs')
        .then(response => response.json())
        .then(data => {
            const jobsContainer = document.getElementById('jobs-container');
            jobsContainer.innerHTML = "";
            data.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.classList.add('job');
                jobElement.innerHTML = `
                    <h2>${job.title}</h2>
                    <p>${job.description}</p>
                    <p><strong>${job.company}</strong> - ${job.location}</p>
                    <p>Salary: ${job.salary}</p>
                `;
                jobsContainer.appendChild(jobElement);
            });
        })
        .catch(err => console.error('Error fetching jobs:', err));
}
