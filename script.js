document.addEventListener('DOMContentLoaded', () => {

    // ##################################################################
    // ### UŻYTKOWNIK WYPEŁNIA TE DWIE LISTY NAZWAMI PLIKÓW GRAFICZNYCH ###
    // ##################################################################
    // Podaj tylko nazwy plików. Muszą one znajdować się w odpowiednich
    // folderach: 'images/correct/' i 'images/defects/'.

    const correctImageFiles = [
        '20241025_102006-mp4_frame_11_jpg.rf.ba292bfaf7db00447fa4f7bf03affb0f_pole_1.png',
        '20241025_102238-mp4_frame_12_jpg.rf.18bbccdaee5e901a7ae1065e9c154461_pole_0.png',
        '20241025_103255-mp4_frame_45_jpg.rf.e3f7c8cfe3420d84e61d37549db91c12_pole_0.png',
        '20241025_104213-mp4_frame_0_jpg.rf.2d1ea1dee4512b347b9ffb32f16e370b_pole_0.png',
        '20241025_104213-mp4_frame_10_jpg.rf.7ba1dfd0b3731363c19dac36d57638e8_pole_1.png',
        '20241025_104213-mp4_frame_13_jpg.rf.0b1b2b6a39e94b1a877bb5051fa46038_pole_0.png',
        '20241025_105536-mp4_frame_16_jpg.rf.b187e6e87e3bdef4deea1c3dd3499aa8_pole_1.png',
        '20241025_111643-mp4_frame_102_jpg.rf.831e5d9d13de165104a3015de60ba70b_pole_0.png',
        '20241025_111643-mp4_frame_120_jpg.rf.b92df8e4003ff53107abc5793738c02a_pole_0.png',
        '20241025_111643-mp4_frame_13_jpg.rf.8885de7661d525d077671405847e77f0_pole_0.png',
        '20241025_111643-mp4_frame_97_jpg.rf.97887931ca86dd5fe07a352351e93221_pole_1.png',
        '20241025_113811-mp4_frame_14_jpg.rf.9e15378e4b26ade735662f14632fac6f_pole_0.png'
    ];

    const defectImageFiles = [
        '20241025_102006-mp4_frame_10_jpg.rf.5d4768ebf425039a4f4763e88001502c_pole_1.png',
        '20241025_102049-mp4_frame_5_jpg.rf.8dd4744c14c6be74b2d9a3552f205245_pole_0.png',
        '20241025_102238-mp4_frame_4_jpg.rf.249d2aa43bdf345cbf8d6d39f5e3af7b_pole_0.png',
        '20241025_103255-mp4_frame_12_jpg.rf.83bfd333d79d9a23940f54519b2d80f0_pole_0.png',
        '20241025_103255-mp4_frame_4_jpg.rf.46527b9feb96a9eda9948347bfa4d586_pole_0.png',
        '20241025_111643-mp4_frame_143_jpg.rf.cee6dfbba37c18cd626b9219b0b6538f_pole_0.png',
        '20241025_111643-mp4_frame_143_jpg.rf.cee6dfbba37c18cd626b9219b0b6538f_pole_1.png',
        'ComfyUI_00008_.png',
        'ComfyUI_00011_.png',
        'ComfyUI_00014_.png',
        'ComfyUI_00017_.png',
        'ComfyUI_00023_.png',
        'ComfyUI_00025_.png',
        'ComfyUI_00039_.png',
        'ComfyUI_00044_.png',
        'ComfyUI_00046_.png',
        'defect-var-1.png',
        'defect-var-2.png',
        'defect-var-3.png',
        'defect-var-4.png',
        'defect-var-5.png',
        'defect-var-6.png',
        'razor-defect.png',
        'razor_fail_structure.png'
    ];

    // --- Koniec sekcji użytkownika ---

    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    
    const progressText = document.getElementById('progress-text');
    const quizImage = document.getElementById('quiz-image');
    const choiceButtons = document.querySelectorAll('.choice-btn');

    const scoreText = document.getElementById('score-text');
    const feedbackText = document.getElementById('feedback-text');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const TOTAL_QUESTIONS = 10;
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createQuestions() {
        questions = [];
        
        shuffleArray(correctImageFiles);
        shuffleArray(defectImageFiles);

        const correctQuestions = correctImageFiles.slice(0, 5).map(file => ({
            src: `images/correct/${file}`,
            answer: 'correct'
        }));

        const defectQuestions = defectImageFiles.slice(0, 5).map(file => ({
            src: `images/defects/${file}`,
            answer: 'anomalous'
        }));

        questions = [...correctQuestions, ...defectQuestions];
        shuffleArray(questions);
    }

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            progressText.textContent = `PRÓBKA ${currentQuestionIndex + 1}/${TOTAL_QUESTIONS}`;
            quizImage.src = questions[currentQuestionIndex].src;
        } else {
            showResults();
        }
    }

    function handleChoice(e) {
        const selectedChoice = e.target.dataset.choice;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (selectedChoice === correctAnswer) {
            score++;
        }

        currentQuestionIndex++;
        showQuestion();
    }

    function getFeedback(percentage) {
        if (percentage <= 30) {
            return 'DIAGNOZA: Błąd systemowy... w percepcji. Rekalibracja czujników optycznych zalecana. Próbuj dalej.';
        } else if (percentage <= 60) {
            return 'STATUS: Inspektor-stażysta. Wykrywasz oczywiste błędy, ale subtelne anomalie umykają. Jeszcze kilka cykli treningowych i będzie dobrze.';
        } else if (percentage <= 90) {
            return 'OCENA: Wysoka skuteczność. Jesteś niezawodnym komponentem systemu. Zostało Ci tylko kilka kroków do perfekcji.';
        } else {
            return 'SYSTEM ZWALIDOWANY: Perfekcyjna precyzja. Masz oko jak nasz najlepszy model AI. Kwalifikacja przyznana. Witamy w zespole ASOL!';
        }
    }

    function showResults() {
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');

        const percentage = (score / TOTAL_QUESTIONS) * 100;
        scoreText.textContent = `SKUTECZNOŚĆ: ${percentage}%`;
        feedbackText.textContent = getFeedback(percentage);
    }

    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        createQuestions();
        
        startScreen.classList.remove('active');
        resultScreen.classList.remove('active');
        quizScreen.classList.add('active');
        
        showQuestion();
    }

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

    choiceButtons.forEach(button => {
        button.addEventListener('click', handleChoice);
    });

}); 