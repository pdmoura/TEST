class About {
    constructor() {
        this.teamGrid = document.getElementById('team-grid');
        this.init();
    }

    async init() {
        await this.fetchTeam();
        this.renderTeam();
    }

    async fetchTeam() {
        try {
            const response = await fetch('data/team.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.team = await response.json();
        } catch (error) {
            console.error("Could not fetch team data:", error);
            this.teamGrid.innerHTML = '<p>Error loading team information.</p>';
        }
    }

    renderTeam() {
        if (!this.teamGrid) return;
        this.teamGrid.innerHTML = '';
        this.team.forEach(member => {
            const memberCard = `
                <div class="team-member">
                     <img src="${member.image.replace('images/', 'https://placehold.co/150x150/8A2BE2/FFFFFF?text=')}" alt="Photo of ${member.name}" loading="lazy">
                    <h3>${member.name}</h3>
                    <p class="title">${member.title}</p>
                    <p class="description">${member.description}</p>
                </div>
            `;
            this.teamGrid.innerHTML += memberCard;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('team-grid')){
        new About();
    }
});
