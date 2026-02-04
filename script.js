// ===== DOM কন্টেন্ট লোড হওয়ার পরে এক্সিকিউট =====
document.addEventListener('DOMContentLoaded', function () {
    // প্রধান কাউন্টডাউন ইনিশিয়ালাইজ
    initializeMainCountdown();

    // SSC রুটিন টেবিল লোড
    loadRoutineTable();

    // ১৫ দিনের ফাইনাল রুটিন লোড
    loadFinalRoutine();

    // মোবাইল মেনু টগল
    setupMobileMenu();

    // স্ক্রল এনিমেশন
    setupScrollAnimations();

    // প্রোগ্রেস বার আপডেট
    updateProgressBar();
});

// ===== প্রধান কাউন্টডাউন (২১ এপ্রিল, ২০২৬) =====
function initializeMainCountdown() {
    const examDate = new Date('April 21, 2026 09:00:00').getTime();
    const countdownElement = document.getElementById('mainCountdown');

    if (!countdownElement) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = examDate - now;

        if (timeLeft < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // প্রোগ্রেস বার আপডেট
        updateProgressBar(days);
    }

    // প্রতি সেকেন্ডে আপডেট
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== প্রোগ্রেস বার আপডেট =====
function updateProgressBar(daysLeft) {
    const totalDays = 365; // ১ বছর আগে থেকে প্রস্তুতি
    const daysPassed = totalDays - (daysLeft || 365);
    const progressPercent = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));

    const progressBar = document.getElementById('examProgress');
    const progressText = document.getElementById('progressText');

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }

    if (progressText) {
        if (progressPercent < 25) {
            progressText.textContent = "প্রস্তুতি শুরু করুন!";
        } else if (progressPercent < 50) {
            progressText.textContent = "ভালো চলছে! চালিয়ে যান।";
        } else if (progressPercent < 75) {
            progressText.textContent = "অর্ধেকের বেশি শেষ!";
        } else if (progressPercent < 90) {
            progressText.textContent = "প্রায় শেষ! শেষ ধাক্কা দিন।";
        } else {
            progressText.textContent = "প্রস্তুতি প্রায় সম্পূর্ণ!";
        }
    }
}

// ===== SSC পরীক্ষার রুটিন টেবিল =====
function loadRoutineTable() {
    const routineData = [
        { date: '2026-04-21', subject: 'বাংলা ১ম পত্র', resource: '#' },
        { date: '2026-04-23', subject: 'বাংলা ২য় পত্র', resource: '#' },
        { date: '2026-04-26', subject: 'ইংরেজি ১ম পত্র', resource: '#' },
        { date: '2026-04-28', subject: 'ইংরেজি ২য় পত্র', resource: '#' },
        { date: '2026-04-30', subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)', resource: '#' },
        { date: '2026-05-03', subject: 'সাধারণ গণিত', resource: 'https://drive.google.com/drive/folders/1Q-dOYWYxcPwUPIMoLt9VBiimS_IZatjj' },
        { date: '2026-05-05', subject: 'বাংলাদেশ ও বিশ্বপরিচয়', resource: '#' },
        { date: '2026-05-07', subject: 'ইসলাম ও নৈতিক শিক্ষা (ধর্ম)', resource: '#' },
        { date: '2026-05-10', subject: 'পদার্থবিজ্ঞান', resource: 'https://drive.google.com/drive/folders/1QGIDWMeQ6OBx9j_7VMeSj-ljIcqL0bCB' },
        { date: '2026-05-14', subject: 'রসায়ন', resource: 'https://drive.google.com/drive/folders/18Qw5DcWAffN8Wfn1dEPX_Tesl744U5Wo' }
    ];

    const tableBody = document.getElementById('routineTable');
    if (!tableBody) return;

    let nextExamFound = false;
    let upcomingCount = 0;
    let completedCount = 0;
    let nextExamSubject = '';
    let nextExamDays = 0;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    routineData.forEach(exam => {
        const examDate = new Date(exam.date);
        examDate.setHours(0, 0, 0, 0);

        const timeDiff = examDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        let status = '';
        let statusClass = '';
        let daysText = '';

        if (daysLeft < 0) {
            status = 'সম্পন্ন হয়েছে';
            statusClass = 'status-completed';
            daysText = '✓';
            completedCount++;
        } else if (daysLeft === 0) {
            status = 'আজ';
            statusClass = 'status-next';
            daysText = 'আজ!';
            upcomingCount++;
        } else if (daysLeft > 0) {
            if (!nextExamFound) {
                status = 'পরবর্তী পরীক্ষা';
                statusClass = 'status-next';
                nextExamFound = true;
                nextExamSubject = exam.subject;
                nextExamDays = daysLeft;
            } else {
                status = 'আসন্ন';
                statusClass = 'status-upcoming';
            }
            daysText = `${daysLeft} দিন`;
            upcomingCount++;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(exam.date)}</td>
            <td>${exam.subject}</td>
            <td><strong>${daysText}</strong></td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                <a href="${exam.resource}" target="_blank" class="resource-link">
                    <i class="fas fa-external-link-alt"></i> রিসোর্স
                </a>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // স্ট্যাটাস সামারি আপডেট
    document.getElementById('nextExamSubject').textContent = nextExamSubject;
    document.getElementById('nextExamDays').textContent = nextExamDays;
    document.getElementById('upcomingCount').textContent = upcomingCount;
    document.getElementById('completedCount').textContent = completedCount;
}

// ===== ১৫ দিনের ফাইনাল রুটিন লোড =====
function loadFinalRoutine() {
    // CSS for Mini Countdown
    const style = document.createElement('style');
    style.textContent = `
        .countdown-mini {
            background: rgba(0, 243, 255, 0.1);
            border: 1px solid rgba(0, 243, 255, 0.2);
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 10px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            color: #00f3ff;
            display: inline-block;
            font-size: 0.9em;
        }
        .countdown-mini i {
            margin-right: 5px;
        }
        .day-header {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .day-date {
            font-size: 1.1em;
            color: #fff;
        }
    `;
    document.head.appendChild(style);

    const routineData = [
        {
            day: 1, date: '০৬/০২/২০২৬', isoDate: '2026-02-06T09:00:00', title: 'গণিত: MCQ ও জ্ঞান/অনুধাবন (Day-1)',
            subjects: ['অধ্যায় ২: সেট ও ফাংশন', 'অধ্যায় ৩: বীজগাণিতিক রাশি', 'অধ্যায় ১১: বীজগাণিতিক অনুপাত ও সমানুপাত']
        },
        {
            day: 2, date: '০৭/০২/২০২৬', isoDate: '2026-02-07T09:00:00', title: 'গণিত: MCQ ও জ্ঞান/অনুধাবন (Day-2)',
            subjects: ['অধ্যায় ৭: ব্যবহারিক জ্যামিতি', 'অধ্যায় ৮: বৃত্ত', 'অধ্যায় ১৭: পরিসংখ্যান']
        },
        {
            day: 3, date: '০৮/০২/২০২৬', isoDate: '2026-02-08T09:00:00', title: 'গণিত: MCQ ও জ্ঞান/অনুধাবন (Day-3)',
            subjects: ['অধ্যায় ৯: ত্রিকোণমিতিক অনুপাত', 'অধ্যায় ১৬: পরিমিতি']
        },
        {
            day: 4, date: '০৯/০২/২০২৬', isoDate: '2026-02-09T09:00:00', title: 'গণিত পরীক্ষা (MCQ ও জ্ঞান/অনুধাবন)',
            subjects: ['সম্পূর্ণ গণিত রিভিশন ও মডেল টেস্ট'], isExam: true
        },
        {
            day: 5, date: '১০/০২/২০২৬', isoDate: '2026-02-10T09:00:00', title: 'উচ্চতর গণিত: MCQ ও জ্ঞান/অনুধাবন (Day-1)',
            subjects: ['অধ্যায় ২: বীজগাণিতিক রাশি', 'অধ্যায় ৭: অসীম ধারা', 'অধ্যায় ১০: দ্বিপদী বিস্তৃতি']
        },
        {
            day: 6, date: '১১/০২/২০২৬', isoDate: '2026-02-11T09:00:00', title: 'উচ্চতর গণিত: MCQ ও জ্ঞান/অনুধাবন (Day-2)',
            subjects: ['অধ্যায় ৮: ত্রিকোণমিতি (আংশিক)', 'অধ্যায় ৯: সূচকীয় ও লগারিদমীয় ফাংশন']
        },
        {
            day: 7, date: '১২/০২/২০২৬', isoDate: '2026-02-12T09:00:00', title: 'উচ্চতর গণিত: MCQ ও জ্ঞান/অনুধাবন (Day-3)',
            subjects: ['অধ্যায় ১০: দ্বিপদী বিস্তৃতি', 'অধ্যায় ১১: (সিলেবাস অনুযায়ী)', 'অধ্যায় ১২: সমতলীয় ভেক্টর']
        },
        {
            day: 8, date: '১৩/০২/২০২৬', isoDate: '2026-02-13T09:00:00', title: 'উচ্চতর গণিত পরীক্ষা (MCQ ও জ্ঞান/অনুধাবন)',
            subjects: ['সম্পূর্ণ উচ্চতর গণিত রিভিশন'], isExam: true
        },
        {
            day: 9, date: '১৪/০২/২০২৬', isoDate: '2026-02-14T09:00:00', title: 'পদার্থবিজ্ঞান: MCQ ও জ্ঞান/অনুধাবন (Day-1)',
            subjects: ['অধ্যায় ১: ভৌত রাশি ও পরিমাপ', 'অধ্যায় ২: গতি', 'অধ্যায় ৩: বল']
        },
        {
            day: 10, date: '১৫/০২/২০২৬', isoDate: '2026-02-15T09:00:00', title: 'পদার্থবিজ্ঞান: MCQ ও জ্ঞান/অনুধাবন (Day-2)',
            subjects: ['অধ্যায় ৪: কাজ, শক্তি ও ক্ষমতা', 'অধ্যায় ৭: তরঙ্গ ও শব্দ']
        },
        {
            day: 11, date: '১৬/০২/২০২৬', isoDate: '2026-02-16T09:00:00', title: 'পদার্থবিজ্ঞান: MCQ ও জ্ঞান/অনুধাবন (Day-3)',
            subjects: ['অধ্যায় ৮: আলোর প্রতিফলন', 'অধ্যায় ১০: স্থির বিদ্যুৎ']
        },
        {
            day: 12, date: '১৭/০২/২০২৬', isoDate: '2026-02-17T09:00:00', title: 'পদার্থবিজ্ঞান পরীক্ষা (MCQ ও জ্ঞান/অনুধাবন)',
            subjects: ['সম্পূর্ণ পদার্থবিজ্ঞান রিভিশন'], isExam: true
        },
        {
            day: 13, date: '১৮/০২/২০২৬', isoDate: '2026-02-18T09:00:00', title: 'রসায়ন: MCQ ও জ্ঞান/অনুধাবন (Day-1)',
            subjects: ['অধ্যায় ৩: পদার্থের গঠন', 'অধ্যায় ৪: পর্যায় সারণি', 'অধ্যায় ৫: রাসায়নিক বন্ধন (আংশিক)']
        },
        {
            day: 14, date: '১৯/০২/২০২৬', isoDate: '2026-02-19T09:00:00', title: 'রসায়ন: MCQ ও জ্ঞান/অনুধাবন (Day-2)',
            subjects: ['অধ্যায় ৬: মোলের ধারণা ও রাসায়নিক গণনা', 'অধ্যায় ৭: রাসায়নিক বিক্রিয়া']
        },
        {
            day: 15, date: '২০/০২/২০২৬', isoDate: '2026-02-20T09:00:00', title: 'রসায়ন ও পরীক্ষা (MCQ ও জ্ঞান/অনুধাবন)',
            subjects: ['অধ্যায় ১১: খনিজ সম্পদ', 'রসায়ন মডেল টেস্ট'], isExam: true
        }
    ];

    const routineDaysContainer = document.querySelector('.routine-days');
    if (!routineDaysContainer) return;

    // Clear existing content
    routineDaysContainer.innerHTML = '';

    routineData.forEach((day, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = `routine-day ${day.isExam ? 'exam-day' : ''}`;

        let subjectsHTML = '';
        day.subjects.forEach(subject => {
            subjectsHTML += `<li><i class="fas fa-book"></i> ${subject}</li>`;
        });

        const timerId = `routine-timer-${index}`;

        dayElement.innerHTML = `
            <div class="day-header">
                <span class="day-date">${day.date}</span>
                <span class="day-title">${day.title}</span>
                <div class="countdown-mini" id="${timerId}">
                    <i class="fas fa-clock"></i> লোডিং...
                </div>
            </div>
            <ul class="subject-list">
                ${subjectsHTML}
            </ul>
        `;

        routineDaysContainer.appendChild(dayElement);
    });

    // Live Timer Update Logic
    function updateRoutineCountdowns() {
        const now = new Date().getTime();

        routineData.forEach((day, index) => {
            const targetTime = new Date(day.isoDate).getTime();
            const timerEl = document.getElementById(`routine-timer-${index}`);

            if (!timerEl) return;

            // Calculate start and end of the day usually
            // Here we just countdown to the start (09:00 AM)
            const diff = targetTime - now;

            if (diff < 0) {
                // If within 24 hours after start, say "Ongoing"
                const dayEnd = targetTime + (24 * 60 * 60 * 1000);
                if (now < dayEnd) {
                    timerEl.innerHTML = '<i class="fas fa-play-circle"></i> আজকের পড়া চলছে';
                    timerEl.style.color = '#00ff88';
                    timerEl.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                } else {
                    timerEl.innerHTML = '<i class="fas fa-check-circle"></i> সম্পন্ন';
                    timerEl.style.color = '#888';
                    timerEl.style.borderColor = 'rgba(136, 136, 136, 0.3)';
                }
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                let timeString = '';
                if (days > 0) timeString += `${days} দিন `;
                timeString += `${hours}h ${minutes}m ${seconds}s`;

                timerEl.innerHTML = `<i class="fas fa-stopwatch"></i> ${timeString}`;
            }
        });
    }

    // Start Timer
    updateRoutineCountdowns();
    setInterval(updateRoutineCountdowns, 1000);
}

// ===== তারিখ ফরম্যাটিং =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('bn-BD', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
}

// ===== মোবাইল মেনু সেটআপ =====
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';

            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.gap = '15px';
                navLinks.style.borderTop = '1px solid rgba(0, 243, 255, 0.1)';
            }
        });

        // রেসাইজ হলে মেনু রিসেট
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                navLinks.style.display = '';
            }
        });
    }
}

// ===== স্ক্রল এনিমেশন =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // অ্যানিমেট করতে চাওয়া এলিমেন্টগুলো
    const animateElements = document.querySelectorAll('.resource-card, .routine-day, .about-card, .status-item');
    animateElements.forEach(el => observer.observe(el));

    // CSS ক্লাস যোগ
    const style = document.createElement('style');
    style.textContent = `
        .resource-card, .routine-day, .about-card, .status-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ===== স্ক্রলে স্মুথ নেভিগেশন =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // মোবাইল মেনু ক্লোজ
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});
