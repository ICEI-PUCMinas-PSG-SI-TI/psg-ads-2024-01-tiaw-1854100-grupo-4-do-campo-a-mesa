document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const imageInput = document.getElementById('image');
        let imageUrl = '';

        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageUrl = e.target.result;
                addFeedback(name, message, imageUrl);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            addFeedback(name, message, imageUrl);
        }
    });

    function addFeedback(name, message, imageUrl) {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const timestamp = new Date().toLocaleString();
        feedbacks.push({ name, message, imageUrl, timestamp });
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        displayFeedbacks();
        feedbackForm.reset();
        thankYouMessage.style.display = 'block';
        setTimeout(() => { thankYouMessage.style.display = 'none'; }, 3000);
    }

    function displayFeedbacks() {
        feedbackContainer.innerHTML = '';
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.forEach((feedback, index) => {
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'feedback-container';
            feedbackElement.innerHTML = `
                <div class="feedback-header">
                    <h5>${feedback.name}</h5>
                    <small>${feedback.timestamp}</small>
                </div>
                <p>${feedback.message}</p>
                ${feedback.imageUrl ? `<img src="${feedback.imageUrl}" alt="Feedback Image" class="img-fluid mb-3" />` : ''}
                <button class="btn btn-primary btn-sm" onclick="editFeedback(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFeedback(${index})">Excluir</button>
            `;
            feedbackContainer.appendChild(feedbackElement);
        });
    }

    window.editFeedback = function(index) {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const feedback = feedbacks[index];
        document.getElementById('name').value = feedback.name;
        document.getElementById('message').value = feedback.message;
        feedbacks.splice(index, 1);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        displayFeedbacks();
    };

    window.deleteFeedback = function(index) {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.splice(index, 1);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        displayFeedbacks();
    };

    displayFeedbacks();
});