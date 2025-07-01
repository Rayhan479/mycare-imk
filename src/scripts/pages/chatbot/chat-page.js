import CatatanEmosi from "../catatan-emosi/catatan-emosi.js";

export default class ChatPageView {
    constructor() {
        this.messageInput = null;
        this.sendButton = null;
        this.messages = [];
        this.apiEndpoint =
            "https://mycare-ai-server-621601697343.asia-southeast2.run.app/api/chat";
        this.classifyEndpoint =
            "https://mycare-ai-server-621601697343.asia-southeast2.run.app/api/classify";
        this.isLoading = false;
        this.conversationHistory = [];
        this.emotionCounts = {
            sadness: 0,
            anger: 0,
            fear: 0,
            suicidal: 0,
            neutral: 0,
        };
        this.lastThreeEmotions = [];
        this.classificationFinal = null;
        this.totalEmotionClassifications = 0;
        this.REQUIRED_CLASSIFICATIONS = 3;
        this.sessionStarted = false;
        this.musicRecommendations = {
            sadness: [
                {
                    title: "Breathe Me",
                    artist: "Sia",
                    url: "https://www.youtube.com/watch?v=ghPcYqn0p4Y",
                    thumbnail:
                        "https://img.youtube.com/vi/SFGvmrJ5rjM/mqdefault.jpg",
                    videoId: "SFGvmrJ5rjM",
                },
                {
                    title: "Fix You",
                    artist: "Coldplay",
                    url: "https://www.youtube.com/watch?v=k4V3Mo61fJM",
                    thumbnail:
                        "https://img.youtube.com/vi/k4V3Mo61fJM/mqdefault.jpg",
                    videoId: "k4V3Mo61fJM",
                },
                {
                    title: "Healing",
                    artist: "Fletcher",
                    url: "https://www.youtube.com/watch?v=5nrxAfpQFnQ",
                    thumbnail:
                        "https://img.youtube.com/vi/5nrxAfpQFnQ/mqdefault.jpg",
                    videoId: "5nrxAfpQFnQ",
                },
            ],
            anger: [
                {
                    title: "Lose Yourself",
                    artist: "Eminem",
                    url: "https://www.youtube.com/watch?v=_Yhyp-_hX2s",
                    thumbnail:
                        "https://img.youtube.com/vi/_Yhyp-_hX2s/mqdefault.jpg",
                    videoId: "_Yhyp-_hX2s",
                },
                {
                    title: "Break Stuff",
                    artist: "Limp Bizkit",
                    url: "https://www.youtube.com/watch?v=ZpUYjpKg9KY",
                    thumbnail:
                        "https://img.youtube.com/vi/ZpUYjpKg9KY/mqdefault.jpg",
                    videoId: "ZpUYjpKg9KY",
                },
                {
                    title: "Stronger",
                    artist: "Kanye West",
                    url: "https://www.youtube.com/watch?v=PsO6ZnUZI0g",
                    thumbnail:
                        "https://img.youtube.com/vi/PsO6ZnUZI0g/mqdefault.jpg",
                    videoId: "PsO6ZnUZI0g",
                },
            ],
            fear: [
                {
                    title: "Weightless",
                    artist: "Marconi Union",
                    url: "https://www.youtube.com/watch?v=UfcAVejslrU",
                    thumbnail:
                        "https://img.youtube.com/vi/UfcAVejslrU/mqdefault.jpg",
                    videoId: "UfcAVejslrU",
                },
                {
                    title: "Electra",
                    artist: "Airstream",
                    url: "https://www.youtube.com/watch?v=zU3ho1kDMRE",
                    thumbnail:
                        "https://img.youtube.com/vi/zU3ho1kDMRE/mqdefault.jpg",
                    videoId: "zU3ho1kDMRE",
                },
                {
                    title: "Pure Shores",
                    artist: "All Saints",
                    url: "https://www.youtube.com/watch?v=dVNdTXEJv1A",
                    thumbnail:
                        "https://img.youtube.com/vi/dVNdTXEJv1A/mqdefault.jpg",
                    videoId: "dVNdTXEJv1A",
                },
            ],
            suicidal: [
                {
                    title: "1-800-273-8255",
                    artist: "Logic",
                    url: "https://www.youtube.com/watch?v=Kb24RrHIbFk",
                    thumbnail:
                        "https://img.youtube.com/vi/Kb24RrHIbFk/mqdefault.jpg",
                    videoId: "Kb24RrHIbFk",
                },
                {
                    title: "Hold On",
                    artist: "Chord Overstreet",
                    url: "https://www.youtube.com/watch?v=8ofCZObsnOo",
                    thumbnail:
                        "https://img.youtube.com/vi/8ofCZObsnOo/mqdefault.jpg",
                    videoId: "8ofCZObsnOo",
                },
                {
                    title: "Alive",
                    artist: "Sia",
                    url: "https://www.youtube.com/watch?v=t2NgsJrrAyM",
                    thumbnail:
                        "https://img.youtube.com/vi/t2NgsJrrAyM/mqdefault.jpg",
                    videoId: "t2NgsJrrAyM",
                },
            ],
            neutral: [
                {
                    title: "Happy",
                    artist: "Pharrell Williams",
                    url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
                    thumbnail:
                        "https://img.youtube.com/vi/ZbZSe6N_BXs/mqdefault.jpg",
                    videoId: "ZbZSe6N_BXs",
                },
                {
                    title: "Good Day",
                    artist: "Surfaces",
                    url: "https://www.youtube.com/watch?v=2Zt5cAUPh94",
                    thumbnail:
                        "https://img.youtube.com/vi/2Zt5cAUPh94/mqdefault.jpg",
                    videoId: "2Zt5cAUPh94",
                },
                {
                    title: "Walking On Sunshine",
                    artist: "Katrina & The Waves",
                    url: "https://www.youtube.com/watch?v=iPUmE-tne5U",
                    thumbnail:
                        "https://img.youtube.com/vi/iPUmE-tne5U/mqdefault.jpg",
                    videoId: "iPUmE-tne5U",
                },
            ],
        };
        this.musicPlayer = null;
        this.currentPlayingMusic = null;
        this.sessionStartTime = new Date().getTime();
        this.lastEmotionResetTime = this.sessionStartTime;

        this.emotionResources = {
            fear: {
               articles: [
                {
                    title: "How to manage fear and anxiety",
                    source: "Mental Health Foundation UK",
                    link: "https://www.mentalhealth.org.uk/explore-mental-health/publications/how-overcome-anxiety-and-fear"
                },
                {
                    title: "One habit could reduce your fears of public speaking, criticism, failure and more",
                    source: "VeryWellMind",
                    link: "https://edition.cnn.com/2021/11/04/health/mindfulness-practices-for-fear-benefits-wellness"
                },
                {
                    title: "Anxiety Management: Fear Leads to Worry",
                    source: "The Conover Company",
                    link: "https://www.conovercompany.com/anxiety-management-fear-leads-worry/"
                },
                {
                    title: "Anxiety and Anger: Understand the Relationship",
                    source: "Mind Health Group",
                    link: "https://www.mindhealthgroup.com/blog/anxiety-anger-whats-the-relationship/"
                },
                {
                    title: "Human Emotional Evaluation of Ancestral and Modern Threats",
                    source: "Frontiers in Psychology",
                    link: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1321053/full"
                }
            ],

                journals: [
                    {
                        title: "The Neuroscience of Fear and Its Modulation Through Meditation",
                        source: "Nature Reviews Neuroscience (2020)",
                        link: "https://doi.org/10.1038/s41583-020-0320-6",
                    },
                    {
                        title: "Fear, Anxiety and COVID-19: A Systematic Review",
                        source: "Brain, Behavior, and Immunity (2021)",
                        link: "https://doi.org/10.1016/j.bbi.2020.10.028",
                    },
                    {
                        title: "Fear Extinction and Emotion Regulation in Mindfulness",
                        source: "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging (2022)",
                        link: "https://doi.org/10.1016/j.bpsc.2021.10.004",
                    },
                    {
                        title: "Virtual Reality Exposure Therapy for Fear",
                        source: "Journal of Anxiety Disorders (2020)",
                        link: "https://doi.org/10.1016/j.janxdis.2019.102147",
                    },
                    {
                        title: "Fear Processing in Social Media Exposure",
                        source: "Computers in Human Behavior (2023)",
                        link: "https://doi.org/10.1016/j.chb.2023.107324",
                    },
                ],
                meditations: [
                    {
                        title: "Fear & Anxiety Guided Meditation",
                        source: "Michael Sealey (2023)",
                        link: "https://www.youtube.com/watch?v=2zxJxV4qLug",
                    },
                    {
                        title: "Let Go of Fear",
                        source: "Great Meditation (2024)",
                        link: "https://www.youtube.com/watch?v=1vzv_My2kqI",
                    },
                    {
                        title: "Healing Fear",
                        source: "Sarah Blondin - Insight Timer (2021)",
                        link: "https://insighttimer.com/sarahblondin",
                    },
                    {
                        title: "Fear Release",
                        source: "Tamara Levitt - Calm App",
                        link: "https://www.calm.com/tamara-levitt",
                    },
                    {
                        title: "Facing Fear Daily Meditation",
                        source: "Headspace",
                        link: "https://www.headspace.com/meditation/anxiety",
                    },
                ],
                music: [
                    {
                        title: "Electra",
                        artist: "Airstream",
                        type: "Chill ambient",
                        link: "https://youtu.be/8bS4Y9Od8TI?si=54ueWhBqiOcxqyeD",
                    },
                    {
                        title: "Night Owl",
                        artist: "Galimatias",
                        type: "Chill electronic",
                        link: "https://youtu.be/BOWUM4Qt2J4?si=dmgA6d_Vy-j1pPj6",
                    },
                    {
                        title: "Mellomaniac (Chillout Mix)",
                        artist: "DJ Shah",
                        type: "Chillout",
                        link: "https://youtu.be/EcRXlM6edrM?si=C3jTSOC7ppUuMr2l",
                    },
                    {
                        title: "An Ending (Ascent)",
                        artist: "Brian Eno",
                        type: "Ambient",
                        link: "https://youtu.be/hvzQQOAjuoU?si=yve0Yh4mH3L9eEk5",
                    },
                    {
                        title: "Delta Waves Sleep Music",
                        artist: "Binaural Beats Therapy",
                        type: "Brainwave audio (deep relax)",
                        link: "https://youtu.be/xQ6xgDI7Whc?si=8CTHn-Y_GLqvs2Rg",
                    },
                ],
            },
            sadness: {
                articles: [
                    {
                        title: "Sadness in Psychology: Exploring the Emotional Landscape",
                        source: "NeuroLaunch",
                        link: "https://neurolaunch.com/what-is-sadness-in-psychology/"
                    },
                    {
                        title: "Depression vs. Sadness: How to Tell the Difference",
                        source: "Medical News Today",
                        link: "https://www.medicalnewstoday.com/articles/314418"
                    },
                    {
                        title: "What Is Depression?",
                        source: "American Psychiatric Association",
                        link: "https://www.psychiatry.org/patients-families/depression/what-is-depression"
                    },
                    {
                        title: "Understanding Grief and Loss",
                        source: "help guide",
                        link: "https://www.helpguide.org/mental-health/grief/coping-with-grief-and-loss"
                    }
                ],

                journals: [
                    {
                        title: "The Neuroscience of Fear and Its Modulation Through Meditation",
                        source: "Nature Reviews Neuroscience (2020)",
                        link: "https://doi.org/10.1038/s41583-020-0320-6",
                    },
                    {
                        title: "Fear, Anxiety and COVID-19: A Systematic Review",
                        source: "Brain, Behavior, and Immunity (2021)",
                        link: "https://doi.org/10.1016/j.bbi.2020.10.028",
                    },
                    {
                        title: "Fear Extinction and Emotion Regulation in Mindfulness",
                        source: "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging (2022)",
                        link: "https://doi.org/10.1016/j.bpsc.2021.10.004",
                    },
                    {
                        title: "Virtual Reality Exposure Therapy for Fear",
                        source: "Journal of Anxiety Disorders (2020)",
                        link: "https://doi.org/10.1016/j.janxdis.2019.102147",
                    },
                    {
                        title: "Fear Processing in Social Media Exposure",
                        source: "Computers in Human Behavior (2023)",
                        link: "https://doi.org/10.1016/j.chb.2023.107324",
                    },
                ],
                meditations: [
                    {
                        title: "Fear & Anxiety Guided Meditation",
                        source: "Michael Sealey (2023)",
                        link: "https://www.youtube.com/watch?v=2zxJxV4qLug",
                    },
                    {
                        title: "Let Go of Fear",
                        source: "Great Meditation (2024)",
                        link: "https://www.youtube.com/watch?v=1vzv_My2kqI",
                    },
                    {
                        title: "Healing Fear",
                        source: "Sarah Blondin - Insight Timer (2021)",
                        link: "https://insighttimer.com/sarahblondin",
                    },
                    {
                        title: "Fear Release",
                        source: "Tamara Levitt - Calm App",
                        link: "https://www.calm.com/tamara-levitt",
                    },
                    {
                        title: "Facing Fear Daily Meditation",
                        source: "Headspace",
                        link: "https://www.headspace.com/meditation/anxiety",
                    },
                ],
                music: [
                    {
                        title: "Electra",
                        artist: "Airstream",
                        type: "Chill ambient",
                        link: "https://youtu.be/8bS4Y9Od8TI?si=54ueWhBqiOcxqyeD",
                    },
                    {
                        title: "Night Owl",
                        artist: "Galimatias",
                        type: "Chill electronic",
                        link: "https://youtu.be/BOWUM4Qt2J4?si=dmgA6d_Vy-j1pPj6",
                    },
                    {
                        title: "Mellomaniac (Chillout Mix)",
                        artist: "DJ Shah",
                        type: "Chillout",
                        link: "https://youtu.be/EcRXlM6edrM?si=C3jTSOC7ppUuMr2l",
                    },
                    {
                        title: "An Ending (Ascent)",
                        artist: "Brian Eno",
                        type: "Ambient",
                        link: "https://youtu.be/hvzQQOAjuoU?si=yve0Yh4mH3L9eEk5",
                    },
                    {
                        title: "Delta Waves Sleep Music",
                        artist: "Binaural Beats Therapy",
                        type: "Brainwave audio (deep relax)",
                        link: "https://youtu.be/xQ6xgDI7Whc?si=8CTHn-Y_GLqvs2Rg",
                    },
                ],
            },
            anger: {
                articles: [
                    {
                        title: "mengapa-marah-dan-melepas-emosi-penting",
                        source: "kompas.id",
                        link: "https://www.kompas.id/baca/gaya-hidup/2024/08/04/mengapa-marah-dan-melepas-emosi-penting"
                    },
                    {
                        title: "penyebab-seseorang-bisa-punya-anger-issues",
                        source: "antaranews",
                        link: "https://www.antaranews.com/berita/4791069/penyebab-seseorang-bisa-punya-anger-issues"
                    },
                    {
                        title: "Control anger before it controls you",
                        source: "Mindful.org",
                        link: "https://www.apa.org/topics/anger/control"
                    },
                    {
                        title: "Anxiety and Anger: Exploring the Relationship",
                        source: "Talkspace",
                        link: "https://www.talkspace.com/mental-health/conditions/articles/anxiety-and-anger/"
                    },
                    {
                        title: "Anxiety and Anger: How They're Connected",
                        source: "Discovery Mood & Anxiety Program",
                        link: "https://discoverymood.com/blog/anxiety-and-anger/"
                    }
                ],

                journals: [
                    {
                        title: "The Neuroscience of Fear and Its Modulation Through Meditation",
                        source: "Nature Reviews Neuroscience (2020)",
                        link: "https://doi.org/10.1038/s41583-020-0320-6",
                    },
                    {
                        title: "Fear, Anxiety and COVID-19: A Systematic Review",
                        source: "Brain, Behavior, and Immunity (2021)",
                        link: "https://doi.org/10.1016/j.bbi.2020.10.028",
                    },
                    {
                        title: "Fear Extinction and Emotion Regulation in Mindfulness",
                        source: "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging (2022)",
                        link: "https://doi.org/10.1016/j.bpsc.2021.10.004",
                    },
                    {
                        title: "Virtual Reality Exposure Therapy for Fear",
                        source: "Journal of Anxiety Disorders (2020)",
                        link: "https://doi.org/10.1016/j.janxdis.2019.102147",
                    },
                    {
                        title: "Fear Processing in Social Media Exposure",
                        source: "Computers in Human Behavior (2023)",
                        link: "https://doi.org/10.1016/j.chb.2023.107324",
                    },
                ],
                meditations: [
                    {
                        title: "Fear & Anxiety Guided Meditation",
                        source: "Michael Sealey (2023)",
                        link: "https://www.youtube.com/watch?v=2zxJxV4qLug",
                    },
                    {
                        title: "Let Go of Fear",
                        source: "Great Meditation (2024)",
                        link: "https://www.youtube.com/watch?v=1vzv_My2kqI",
                    },
                    {
                        title: "Healing Fear",
                        source: "Sarah Blondin - Insight Timer (2021)",
                        link: "https://insighttimer.com/sarahblondin",
                    },
                    {
                        title: "Fear Release",
                        source: "Tamara Levitt - Calm App",
                        link: "https://www.calm.com/tamara-levitt",
                    },
                    {
                        title: "Facing Fear Daily Meditation",
                        source: "Headspace",
                        link: "https://www.headspace.com/meditation/anxiety",
                    },
                ],
                music: [
                    {
                        title: "Electra",
                        artist: "Airstream",
                        type: "Chill ambient",
                        link: "https://youtu.be/8bS4Y9Od8TI?si=54ueWhBqiOcxqyeD",
                    },
                    {
                        title: "Night Owl",
                        artist: "Galimatias",
                        type: "Chill electronic",
                        link: "https://youtu.be/BOWUM4Qt2J4?si=dmgA6d_Vy-j1pPj6",
                    },
                    {
                        title: "Mellomaniac (Chillout Mix)",
                        artist: "DJ Shah",
                        type: "Chillout",
                        link: "https://youtu.be/EcRXlM6edrM?si=C3jTSOC7ppUuMr2l",
                    },
                    {
                        title: "An Ending (Ascent)",
                        artist: "Brian Eno",
                        type: "Ambient",
                        link: "https://youtu.be/hvzQQOAjuoU?si=yve0Yh4mH3L9eEk5",
                    },
                    {
                        title: "Delta Waves Sleep Music",
                        artist: "Binaural Beats Therapy",
                        type: "Brainwave audio (deep relax)",
                        link: "https://youtu.be/xQ6xgDI7Whc?si=8CTHn-Y_GLqvs2Rg",
                    },
                ],
            },
            suicidal: {
                articles: [
                    {
                        title: "2024 National Strategy for Suicide Prevention",
                        source: "U.S. Department of Health and Human Services",
                        link: "https://www.hhs.gov/programs/prevention-and-wellness/mental-health-substance-use-disorder/national-strategy-suicide-prevention/index.html"
                    },
                    {
                        title: "Suicide Prevention Month",
                        source: "NAMI",
                        link: "https://www.nami.org/get-involved/awareness-events/suicide-prevention-month/"
                    },
                    {
                        title: "Youth Mental Health Trends in 2025",
                        source: "JED Foundation",
                        link: "https://jedfoundation.org/what-we-expect-in-2025-new-years-trends-in-youth-mental-health/"
                    }
                ],

                journals: [
                    {
                        title: "The Neuroscience of Fear and Its Modulation Through Meditation",
                        source: "Nature Reviews Neuroscience (2020)",
                        link: "https://doi.org/10.1038/s41583-020-0320-6",
                    },
                    {
                        title: "Fear, Anxiety and COVID-19: A Systematic Review",
                        source: "Brain, Behavior, and Immunity (2021)",
                        link: "https://doi.org/10.1016/j.bbi.2020.10.028",
                    },
                    {
                        title: "Fear Extinction and Emotion Regulation in Mindfulness",
                        source: "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging (2022)",
                        link: "https://doi.org/10.1016/j.bpsc.2021.10.004",
                    },
                    {
                        title: "Virtual Reality Exposure Therapy for Fear",
                        source: "Journal of Anxiety Disorders (2020)",
                        link: "https://doi.org/10.1016/j.janxdis.2019.102147",
                    },
                    {
                        title: "Fear Processing in Social Media Exposure",
                        source: "Computers in Human Behavior (2023)",
                        link: "https://doi.org/10.1016/j.chb.2023.107324",
                    },
                ],
                meditations: [
                    {
                        title: "Fear & Anxiety Guided Meditation",
                        source: "Michael Sealey (2023)",
                        link: "https://www.youtube.com/watch?v=2zxJxV4qLug",
                    },
                    {
                        title: "Let Go of Fear",
                        source: "Great Meditation (2024)",
                        link: "https://www.youtube.com/watch?v=1vzv_My2kqI",
                    },
                    {
                        title: "Healing Fear",
                        source: "Sarah Blondin - Insight Timer (2021)",
                        link: "https://insighttimer.com/sarahblondin",
                    },
                    {
                        title: "Fear Release",
                        source: "Tamara Levitt - Calm App",
                        link: "https://www.calm.com/tamara-levitt",
                    },
                    {
                        title: "Facing Fear Daily Meditation",
                        source: "Headspace",
                        link: "https://www.headspace.com/meditation/anxiety",
                    },
                ],
                music: [
                    {
                        title: "Electra",
                        artist: "Airstream",
                        type: "Chill ambient",
                        link: "https://youtu.be/8bS4Y9Od8TI?si=54ueWhBqiOcxqyeD",
                    },
                    {
                        title: "Night Owl",
                        artist: "Galimatias",
                        type: "Chill electronic",
                        link: "https://youtu.be/BOWUM4Qt2J4?si=dmgA6d_Vy-j1pPj6",
                    },
                    {
                        title: "Mellomaniac (Chillout Mix)",
                        artist: "DJ Shah",
                        type: "Chillout",
                        link: "https://youtu.be/EcRXlM6edrM?si=C3jTSOC7ppUuMr2l",
                    },
                    {
                        title: "An Ending (Ascent)",
                        artist: "Brian Eno",
                        type: "Ambient",
                        link: "https://youtu.be/hvzQQOAjuoU?si=yve0Yh4mH3L9eEk5",
                    },
                    {
                        title: "Delta Waves Sleep Music",
                        artist: "Binaural Beats Therapy",
                        type: "Brainwave audio (deep relax)",
                        link: "https://youtu.be/xQ6xgDI7Whc?si=8CTHn-Y_GLqvs2Rg",
                    },
                ],
            },
            neutral: {
                articles: [
                    {
                        title: "How to Work With Fear Today",
                        source: "Mindful.org (2024)",
                        link: "https://www.mindful.org/how-to-deal-with-fear-now/",
                    },
                    {
                        title: "The Role of Mindfulness in Overcoming Fear",
                        source: "VeryWellMind (2023)",
                        link: "https://www.verywellmind.com/mindfulness-and-fear-6500432",
                    },
                    {
                        title: "Facing Modern Fear: From Social Anxiety to AI Panic",
                        source: "Psychology Today (2023)",
                        link: "https://www.psychologytoday.com/us/blog/facing-modern-fears",
                    },
                    {
                        title: "Fear and Digital Overload: What to Do About It",
                        source: "Harvard Health (2022)",
                        link: "https://www.health.harvard.edu/blog/fear-digital-age",
                    },
                    {
                        title: "Is Fear Always Bad? Neuroscientific Insights",
                        source: "Scientific American (2024)",
                        link: "https://www.scientificamerican.com/fear-and-brain-2024",
                    },
                ],
                journals: [
                    {
                        title: "The Neuroscience of Fear and Its Modulation Through Meditation",
                        source: "Nature Reviews Neuroscience (2020)",
                        link: "https://doi.org/10.1038/s41583-020-0320-6",
                    },
                    {
                        title: "Fear, Anxiety and COVID-19: A Systematic Review",
                        source: "Brain, Behavior, and Immunity (2021)",
                        link: "https://doi.org/10.1016/j.bbi.2020.10.028",
                    },
                    {
                        title: "Fear Extinction and Emotion Regulation in Mindfulness",
                        source: "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging (2022)",
                        link: "https://doi.org/10.1016/j.bpsc.2021.10.004",
                    },
                    {
                        title: "Virtual Reality Exposure Therapy for Fear",
                        source: "Journal of Anxiety Disorders (2020)",
                        link: "https://doi.org/10.1016/j.janxdis.2019.102147",
                    },
                    {
                        title: "Fear Processing in Social Media Exposure",
                        source: "Computers in Human Behavior (2023)",
                        link: "https://doi.org/10.1016/j.chb.2023.107324",
                    },
                ],
                meditations: [
                    {
                        title: "Fear & Anxiety Guided Meditation",
                        source: "Michael Sealey (2023)",
                        link: "https://www.youtube.com/watch?v=2zxJxV4qLug",
                    },
                    {
                        title: "Let Go of Fear",
                        source: "Great Meditation (2024)",
                        link: "https://www.youtube.com/watch?v=1vzv_My2kqI",
                    },
                    {
                        title: "Healing Fear",
                        source: "Sarah Blondin - Insight Timer (2021)",
                        link: "https://insighttimer.com/sarahblondin",
                    },
                    {
                        title: "Fear Release",
                        source: "Tamara Levitt - Calm App",
                        link: "https://www.calm.com/tamara-levitt",
                    },
                    {
                        title: "Facing Fear Daily Meditation",
                        source: "Headspace",
                        link: "https://www.headspace.com/meditation/anxiety",
                    },
                ],
                music: [
                    {
                        title: "Electra",
                        artist: "Airstream",
                        type: "Chill ambient",
                        link: "https://youtu.be/8bS4Y9Od8TI?si=54ueWhBqiOcxqyeD",
                    },
                    {
                        title: "Night Owl",
                        artist: "Galimatias",
                        type: "Chill electronic",
                        link: "https://youtu.be/BOWUM4Qt2J4?si=dmgA6d_Vy-j1pPj6",
                    },
                    {
                        title: "Mellomaniac (Chillout Mix)",
                        artist: "DJ Shah",
                        type: "Chillout",
                        link: "https://youtu.be/EcRXlM6edrM?si=C3jTSOC7ppUuMr2l",
                    },
                    {
                        title: "An Ending (Ascent)",
                        artist: "Brian Eno",
                        type: "Ambient",
                        link: "https://youtu.be/hvzQQOAjuoU?si=yve0Yh4mH3L9eEk5",
                    },
                    {
                        title: "Delta Waves Sleep Music",
                        artist: "Binaural Beats Therapy",
                        type: "Brainwave audio (deep relax)",
                        link: "https://youtu.be/xQ6xgDI7Whc?si=8CTHn-Y_GLqvs2Rg",
                    },
                ],
            },
        };
    }

    async render() {
        return `
      <div class="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div class="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div class="flex items-center space-x-4">
            <button class="p-2 hover:bg-gray-100 rounded-lg transition" id="backButton">
              <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <img src="/images/Wrapper.png" alt="Logo" class="h-8" />
          </div>
          <div class="flex items-center space-x-3">
            <button class="p-2 hover:bg-gray-100 rounded-lg transition" id="musicButton">
              <i class="fas fa-music text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="chat-container flex flex-col h-screen ">
        <div class="flex-1 overflow-y-auto px-6 py-4 sm:mx-auto" id="chatMessages">
          <div class="max-w-4xl mx-auto flex items-center justify-center h-full w-full">
            <div class="text-center max-w-2xl mx-auto mb-8">
              <div id="startChatContainer" class="flex justify-center">
                <button id="startChatButton" class="px-8 py-4 bg-linear-to-l from-[#00C6FF] to-[#0084FF] hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <i class="fas fa-comments mr-2"></i>
                  Mulai Curhat Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="musicPlayerContainer" class="hidden px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div class="max-w-4xl mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded overflow-hidden">
                  <img id="musicThumbnail" src="" alt="Thumbnail" class="w-full h-full object-cover">
                </div>
                <div>
                  <p class="font-medium text-gray-800" id="musicTitle">Judul Lagu</p>
                  <p class="text-sm text-gray-600" id="musicArtist">Nama Artis</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <a href="#" target="_blank" id="openYoutubeLink" class="text-red-600 hover:text-red-700">
                  <i class="fab fa-youtube text-xl"></i>
                </a>
                <button id="closePlayerButton" class="text-gray-500 hover:text-gray-700">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 pb-6" id="inputContainer" style="display: none;">
          <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <textarea
                    id="messageInput"
                    class="message-input w-full border-0 resize-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                    placeholder="Tanya Pertanyaan Mu Disini...."
                    rows="1"
                  ></textarea>
                </div>
                <button id="sendButton" class="p-3 bg-linear-to-l from-[#00C6FF] to-[#0084FF] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex-shrink-0" disabled>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="musicRecommendationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Rekomendasi Musik untuk Moodmu</h3>
            <button id="closeModalButton" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p class="text-gray-600 mb-4">Kami mendeteksi bahwa kamu mungkin sedang merasa <span id="detectedMood"></span>. Berikut beberapa musik yang mungkin bisa membantu:</p>
          <div id="musicRecommendationList" class="space-y-3">
            <!-- Music recommendations will be inserted here -->
          </div>
        </div>
      </div>
    `;
    }

    // Fungsi untuk otomatis mengubah ukuran input
    autoResize(event) {
        event.target.style.height = "auto";
        event.target.style.height =
            Math.min(event.target.scrollHeight, 200) + "px";
        this.sendButton.disabled = event.target.value.trim() === "";
    }

    // Fungsi untuk menangani penekanan tombol "Enter"
    handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    // Fungsi untuk menyimpan data ke localStorage
    saveToLocalStorage() {
        const chatData = {
            messages: this.messages,
            conversationHistory: this.conversationHistory,
            emotionCounts: this.emotionCounts,
            lastThreeEmotions: this.lastThreeEmotions,
            classificationFinal: this.classificationFinal,
            totalEmotionClassifications: this.totalEmotionClassifications,
            sessionStartTime: this.sessionStartTime,
            lastEmotionResetTime: this.lastEmotionResetTime,
            sessionStarted: this.sessionStarted,
        };
        localStorage.setItem("mycareai_chat_data", JSON.stringify(chatData));
    }

    // Fungsi untuk memuat data dari localStorage
    loadFromLocalStorage() {
        const chatData = localStorage.getItem("mycareai_chat_data");
        if (chatData) {
            try {
                const parsedData = JSON.parse(chatData);

                // Validasi data sebelum digunakan
                if (parsedData && typeof parsedData === "object") {
                    // Pastikan messages adalah array
                    this.messages = Array.isArray(parsedData.messages)
                        ? parsedData.messages
                        : [];

                    // Pastikan conversationHistory adalah array
                    this.conversationHistory = Array.isArray(
                        parsedData.conversationHistory
                    )
                        ? parsedData.conversationHistory
                        : [];

                    // Pastikan emotionCounts adalah objek dengan struktur yang benar
                    if (
                        parsedData.emotionCounts &&
                        typeof parsedData.emotionCounts === "object"
                    ) {
                        this.emotionCounts = {
                            sadness: parsedData.emotionCounts.sadness || 0,
                            anger: parsedData.emotionCounts.anger || 0,
                            fear: parsedData.emotionCounts.fear || 0,
                            suicidal: parsedData.emotionCounts.suicidal || 0,
                            neutral: parsedData.emotionCounts.neutral || 0,
                        };
                    } else {
                        this.emotionCounts = {
                            sadness: 0,
                            anger: 0,
                            fear: 0,
                            suicidal: 0,
                            neutral: 0,
                        };
                    }

                    // Pastikan lastThreeEmotions adalah array
                    this.lastThreeEmotions = Array.isArray(
                        parsedData.lastThreeEmotions
                    )
                        ? parsedData.lastThreeEmotions
                        : [];

                    // Muat classificationFinal jika ada
                    this.classificationFinal =
                        parsedData.classificationFinal || null;

                    // Muat totalEmotionClassifications
                    this.totalEmotionClassifications =
                        typeof parsedData.totalEmotionClassifications ===
                        "number"
                            ? parsedData.totalEmotionClassifications
                            : 0;

                    // Pastikan timestamps adalah angka yang valid
                    this.sessionStartTime =
                        typeof parsedData.sessionStartTime === "number"
                            ? parsedData.sessionStartTime
                            : new Date().getTime();

                    this.lastEmotionResetTime =
                        typeof parsedData.lastEmotionResetTime === "number"
                            ? parsedData.lastEmotionResetTime
                            : this.sessionStartTime;

                    // Muat status sesi
                    this.sessionStarted = parsedData.sessionStarted || false;

                    // Cek apakah perlu mereset emosi (setiap 24 jam)
                    this.checkEmotionReset();

                    // Render pesan yang tersimpan
                    this.renderSavedMessages();

                    // Tampilkan UI sesuai dengan status sesi
                    this.updateUIBasedOnSessionStatus();
                    if (this.classificationFinal) {
                    // Diberi sedikit jeda untuk memastikan DOM pesan lain sudah ter-render
                    setTimeout(() => {
                        this.showComprehensiveRecommendations(this.classificationFinal);
                    }, 100);
                 }
                }
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
                // Jika terjadi error, gunakan nilai default
                this.resetToDefaultValues();
            }
        } else {
            // Jika tidak ada data di localStorage, gunakan nilai default
            this.resetToDefaultValues();
        }
    }

    // Fungsi untuk mereset ke nilai default
    resetToDefaultValues() {
        this.messages = [];
        this.conversationHistory = [];
        this.emotionCounts = {
            sadness: 0,
            anger: 0,
            fear: 0,
            suicidal: 0,
            neutral: 0,
        };
        this.lastThreeEmotions = [];
        this.classificationFinal = null;
        this.totalEmotionClassifications = 0;
        this.sessionStarted = false;
        this.sessionStartTime = new Date().getTime();
        this.lastEmotionResetTime = this.sessionStartTime;
    }

    checkEmotionReset() {
        const currentTime = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

        if (currentTime - this.lastEmotionResetTime > oneDay) {
            this.resetEmotionData();
            this.lastEmotionResetTime = currentTime;
            this.saveToLocalStorage();
        }
    }

    // Fungsi untuk mereset data emosi
    resetEmotionData() {
        this.emotionCounts = {
            sadness: 0,
            anger: 0,
            fear: 0,
            suicidal: 0,
            neutral: 0,
        };
        this.lastThreeEmotions = [];
    }

    // Fungsi untuk merender pesan yang tersimpan
    renderSavedMessages() {
        const chatMessages = document.getElementById("chatMessages");

        // Bersihkan container pesan
        while (chatMessages.firstChild) {
            if (
                chatMessages.firstChild.classList &&
                chatMessages.firstChild.classList.contains("text-center")
            ) {
                break;
            }
            chatMessages.removeChild(chatMessages.firstChild);
        }

        // Render pesan yang tersimpan
        this.messages.forEach((msg) => {
            const messageElement = document.createElement("div");

            messageElement.className =
                msg.type === "user"
                    ? "flex justify-end mb-4"
                    : "flex justify-start mb-4";

            const bubbleClass =
                msg.type === "user"
                    ? "bg-linear-to-l from-[#00C6FF] to-[#0084FF] text-white rounded-2xl rounded-tr-none py-3 px-4 max-w-[80%]"
                    : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]";

            messageElement.innerHTML = `
                <div class="${bubbleClass}">
                    <p>${this.formatMessage(msg.message)}</p>
                </div>
            `;

            chatMessages.appendChild(messageElement);
        });

        this.scrollToBottom();
    }

    // Fungsi untuk mengirim pesan
    async sendMessage() {
        if (this.isLoading) return;

        const input = this.messageInput;
        const message = input.value.trim();

        if (message) {
            // Tambahkan pesan pengguna ke tampilan
            this.addMessage(message, "user");

            // Simpan pesan pengguna ke history
            this.conversationHistory.push({
                role: "user",
                content: message,
            });

            // Reset input
            input.value = "";
            input.style.height = "auto";
            this.sendButton.disabled = true;

            // Set loading state
            this.isLoading = true;
            this.showTypingIndicator();

            try {
                // Klasifikasi emosi pengguna
                const emotion = await this.classifyEmotion(message);

                // Kirim pesan ke API
                const response = await this.sendMessageToApi(message, emotion);

                // Tambahkan respons dari API ke tampilan
                this.hideTypingIndicator();
                this.addMessage(response, "bot");

                // Simpan respons bot ke history
                this.conversationHistory.push({
                    role: "assistant",
                    content: response,
                });

                // Simpan data ke localStorage
                this.saveToLocalStorage();

                // Cek apakah perlu menampilkan rekomendasi musik
                this.checkMusicRecommendation();
            } catch (error) {
                console.error("Error sending message:", error);
                this.hideTypingIndicator();
                this.addMessage(
                    "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.",
                    "bot error"
                );
            } finally {
                this.isLoading = false;
                this.scrollToBottom();
            }
        }
    }

    // Fungsi untuk klasifikasi emosi
    // --- KODE BARU YANG DIPERBAIKI ---
async classifyEmotion(message) {
    if (!this.sessionStarted) {
        return "neutral";
    }

    // === FILTER KATA KUNCI DITAMBAHKAN DI SINI ===
    const lowerCaseMessage = message.toLowerCase();
    const nonEmotionalKeywords = [
         'halo', 'hai', 'siang', 'sore', 'malam',
    'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam',
    'assalamualaikum', 'apa kabar',
    
    // Pertanyaan Fungsional
    'siapa kamu', 'kamu siapa',
    'apa itu', 'ini aplikasi apa',
    'kamu bisa apa', 'bisa bantu apa', 'apa fungsi kamu',
    'kamu bot ya', 'apakah kamu bot', 'ini robot',
    
    // Permintaan Saran (Non-emosional)
    'kasih saran', 'beri saya saran', 'minta saran', 'butuh saran',
    'rekomendasi', 'jelaskan tentang',
    
    // Penutup & Ucapan Terima Kasih
    'terima kasih', 'makasih',
    'cukup', 'sudah cukup', 'udah dulu',
    'selesai', 'sampai jumpa', 'dah', 'bye',
    
    // Niat & Uji Coba
    'mau curhat', 'cerita', 'saya ingin curhat',
    'tes', 'test', 'testing', 'coba'
    ];

    // Cek apakah pesan mengandung salah satu kata kunci di atas
    const isNonEmotional = nonEmotionalKeywords.some(keyword => lowerCaseMessage.includes(keyword));

     if (isNonEmotional) {
        console.log("Pesan non-emosional terdeteksi, klasifikasi dilewati.");
        return "neutral"; 
    }
    // --- Akhir Filter ---

    try {
        const response = await fetch(this.classifyEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const detectedEmotion = data.emotion || "neutral";

        // === ATURAN DARURAT UNTUK SUICIDAL ===
        if (detectedEmotion === 'suicidal') {
            console.log("!!! DETEKSI SUICIDAL: Memprioritaskan klasifikasi akhir.");
            this.classificationFinal = 'suicidal'; // Langsung tetapkan emosi final
            this.showComprehensiveRecommendations('suicidal'); // Langsung tampilkan rekomendasi darurat
            this.saveToLocalStorage();
            this.saveEmotionToJournal('suicidal');
            return 'suicidal'; // Kembalikan emosi untuk diteruskan ke API chat
        }
        // === AKHIR ATURAN DARURAT ===

        // Lanjutkan logika normal jika bukan suicidal
        if (detectedEmotion !== 'neutral') {
            if (this.emotionCounts[detectedEmotion] !== undefined) {
                this.emotionCounts[detectedEmotion]++;
                this.totalEmotionClassifications++;
            }

            if (this.totalEmotionClassifications >= this.REQUIRED_CLASSIFICATIONS && !this.classificationFinal) {
                this.determineFinalMusicPreference();
            }
        }
        return detectedEmotion;

    } catch (error) {
        console.error("Klasifikasi emosi error:", error);
        return "neutral";
    }
}

    // Fungsi baru untuk menentukan preferensi musik final
    determineFinalMusicPreference() {
        // Temukan emosi dominan dari semua interaksi
        let dominantEmotion = null;
        let maxCount = 0;

        for (const [emotion, count] of Object.entries(this.emotionCounts)) {
            if (count > maxCount) {
                maxCount = count;
                dominantEmotion = emotion;
            }
        }

        // Tetapkan sebagai preferensi musik final
        if (dominantEmotion) {
            this.classificationFinal = dominantEmotion;

            // Tampilkan rekomendasi komprehensif berdasarkan emosi dominan
            this.showComprehensiveRecommendations(dominantEmotion);

            // Simpan data ke localStorage
            this.saveToLocalStorage();

            // Tambahkan entri ke jurnal emosi
            this.saveEmotionToJournal(dominantEmotion);
        }
    }

    // Metode baru untuk menyimpan emosi ke jurnal
    saveEmotionToJournal(emotion) {
        try {
            const catatanEmosi = new CatatanEmosi();

            const dateKey = catatanEmosi.addEmotionJournalFromChatbot(
                emotion,
                this.sessionStartTime
            );

            const chatMessages = document.getElementById("chatMessages");
            if (chatMessages) {
                const messageElement = document.createElement("div");
                messageElement.className = "flex justify-start mb-4";
                messageElement.innerHTML = `
                    <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]">
                        <p>Emosi dominan Anda telah disimpan ke <a href="#/catatan-emosi" class="text-blue-600 underline">Catatan Emosi</a>. Anda dapat melihat dan mengedit catatan ini nanti.</p>
                    </div>
                `;
                chatMessages.appendChild(messageElement);
                this.scrollToBottom();
            }
        } catch (error) {
            console.error("Error saving emotion to journal:", error);
        }
    }

    // Fungsi untuk menampilkan rekomendasi komprehensif
    showComprehensiveRecommendations(emotion) {
        // Tampilkan pesan notifikasi ke chat
        const chatMessages = document.getElementById("chatMessages");
        const messageElement = document.createElement("div");
        messageElement.className = "flex justify-start mb-4";

        // Dapatkan nama emosi dalam bahasa Indonesia
        const emotionNameMap = {
            sadness: "sedih",
            anger: "marah",
            fear: "cemas atau takut",
            suicidal: "sangat tertekan",
            neutral: "senang atau bahagia",
        };
        const emotionName = emotionNameMap[emotion] || emotion;

        // Cek apakah kita memiliki data untuk emosi ini
        const resources = this.emotionResources[emotion];
        if (!resources) {
            // Jika tidak ada data khusus, tampilkan hanya rekomendasi musik
            messageElement.innerHTML = `
                <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]">
                    <p>Berdasarkan percakapan kita, saya telah menentukan bahwa kamu mungkin sedang merasa <strong>${emotionName}</strong>. Berikut rekomendasi musik yang mungkin bisa membantu:</p>
                </div>
            `;
            chatMessages.appendChild(messageElement);
            this.scrollToBottom();

            // Tampilkan rekomendasi musik
            this.showMusicRecommendation(emotion);
            return;
        }

        // Jika ada data lengkap, tampilkan card rekomendasi komprehensif
        const cardElement = document.createElement("div");
        cardElement.className = "flex justify-start mb-4";
        cardElement.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-2xl rounded-tl-none shadow-md p-4 max-w-[90%]">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Rekomendasi untuk Mengelola Perasaan ${emotionName}</h3>
                <p class="text-gray-600 mb-4">Berdasarkan percakapan kita, saya telah mengidentifikasi bahwa kamu mungkin sedang merasa ${emotionName}. Berikut beberapa rekomendasi yang mungkin membantu:</p>

                <div class="space-y-4">
                    <!-- Artikel -->
                    <div class="border-b border-gray-200 pb-4">
                        <h4 class="font-medium text-blue-600 mb-2">Artikel yang Direkomendasikan</h4>
                        <ul class="space-y-2">
                            ${resources.articles
                                .slice(0, 3)
                                .map(
                                    (article) => `
                                <li>
                                    <a href="${article.link}" target="_blank" class="text-gray-700 hover:text-blue-600 flex items-start">
                                        <span class="text-blue-500 mr-2">📄</span>
                                        <span>${article.title} <span class="text-gray-500 text-sm">- ${article.source}</span></span>
                                    </a>
                                </li>
                            `
                                )
                                .join("")}
                        </ul>
                    </div>

                    <!-- Jurnal -->
                    <div class="border-b border-gray-200 pb-4">
                        <h4 class="font-medium text-purple-600 mb-2">Jurnal Penelitian</h4>
                        <ul class="space-y-2">
                            ${resources.journals
                                .slice(0, 2)
                                .map(
                                    (journal) => `
                                <li>
                                    <a href="${journal.link}" target="_blank" class="text-gray-700 hover:text-purple-600 flex items-start">
                                        <span class="text-purple-500 mr-2">📚</span>
                                        <span>${journal.title} <span class="text-gray-500 text-sm">- ${journal.source}</span></span>
                                    </a>
                                </li>
                            `
                                )
                                .join("")}
                        </ul>
                    </div>

                    <!-- Meditasi -->
                    <div class="border-b border-gray-200 pb-4">
                        <h4 class="font-medium text-green-600 mb-2">Meditasi & Mindfulness</h4>
                        <ul class="space-y-2">
                            ${resources.meditations
                                .slice(0, 3)
                                .map(
                                    (meditation) => `
                                <li>
                                    <a href="${meditation.link}" target="_blank" class="text-gray-700 hover:text-green-600 flex items-start">
                                        <span class="text-green-500 mr-2">🧘</span>
                                        <span>${meditation.title} <span class="text-gray-500 text-sm">- ${meditation.source}</span></span>
                                    </a>
                                </li>
                            `
                                )
                                .join("")}
                        </ul>
                    </div>

                    <!-- Musik -->
                    <div>
                        <h4 class="font-medium text-red-600 mb-2">Musik Penenang</h4>
                        <ul class="space-y-2">
                            ${resources.music
                                .slice(0, 3)
                                .map(
                                    (music) => `
                                <li>
                                    <a href="${music.link}" target="_blank" class="text-gray-700 hover:text-red-600 flex items-start">
                                        <span class="text-red-500 mr-2">🎵</span>
                                        <span>${music.title} - ${music.artist} <span class="text-gray-500 text-sm">(${music.type})</span></span>
                                    </a>
                                </li>
                            `
                                )
                                .join("")}
                        </ul>
                    </div>
                </div>

                <div class="mt-4 pt-3 border-t border-gray-200">
                    <button id="showMoreRecommendations" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Lihat lebih banyak rekomendasi
                    </button>
                </div>
            </div>
        `;

        chatMessages.appendChild(cardElement);
        this.scrollToBottom();

        // Tambahkan event listener untuk tombol "Lihat lebih banyak"
        setTimeout(() => {
            const showMoreButton = document.getElementById(
                "showMoreRecommendations"
            );
            if (showMoreButton) {
                showMoreButton.addEventListener("click", () => {
                    this.showMusicRecommendation(emotion);
                });
            }
        }, 100);
    }

    // Fungsi untuk mengirim pesan ke API
    async sendMessageToApi(message, activeEmotion = null) {
        try {
            const payload = {
                message: message,
                conversation_history: this.conversationHistory,
                active_emotion: activeEmotion,
            };

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(
                    "API response not OK:",
                    response.status,
                    errorText
                );
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Sesuai dengan format respons dari server.js
            return data.reply || "Tidak ada respons dari AI.";
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }

    // Fungsi untuk memeriksa apakah perlu menampilkan rekomendasi musik
    checkMusicRecommendation() {
        // Hanya tampilkan rekomendasi jika sesi sudah dimulai
        if (!this.sessionStarted) {
            return;
        }

        // Jika sudah ada preferensi musik final, gunakan itu
        if (this.classificationFinal) {
            return;
        }

        // Pastikan ada minimal 3 pesan dari pengguna sebelum menampilkan rekomendasi
        const userMessages = this.messages.filter((msg) => msg.type === "user");

        // Jika belum ada cukup pesan dari pengguna, jangan tampilkan rekomendasi
        if (userMessages.length < 3) {
            return;
        }

        // Jika belum mencapai jumlah klasifikasi yang dibutuhkan, gunakan metode lama
        if (this.lastThreeEmotions.length === 3) {
            const emotionCounts = {};
            this.lastThreeEmotions.forEach((emotion) => {
                emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            });

            // Temukan emosi dominan
            let dominantEmotion = null;
            let maxCount = 0;

            for (const [emotion, count] of Object.entries(emotionCounts)) {
                if (count > maxCount) {
                    maxCount = count;
                    dominantEmotion = emotion;
                }
            }

            // Jika ada emosi dominan, tampilkan rekomendasi musik
            // Emosi dominan harus muncul minimal 3 kali dari 3 deteksi terakhir
            if (dominantEmotion && maxCount >= 3) {
                this.showMusicRecommendation(dominantEmotion);

                // Reset emosi setelah menampilkan rekomendasi
                this.lastThreeEmotions = [];
                this.saveToLocalStorage();
            }
        }
    }

    // Fungsi untuk menampilkan rekomendasi musik
    showMusicRecommendation(emotion) {
        const modal = document.getElementById("musicRecommendationModal");
        const moodText = document.getElementById("detectedMood");
        const musicList = document.getElementById("musicRecommendationList");

        // Set mood text
        const moodMap = {
            sadness: "sedih",
            anger: "marah",
            fear: "cemas atau takut",
            suicidal: "sangat tertekan",
            neutral: "senang atau bahagia",
        };

        moodText.textContent = moodMap[emotion] || "sedih";

        // Clear previous recommendations
        musicList.innerHTML = "";

        // Add music recommendations
        const recommendations =
            this.musicRecommendations[emotion] ||
            this.musicRecommendations.neutral; // Default ke neutral jika emosi tidak ditemukan
        recommendations.forEach((music, index) => {
            const musicItem = document.createElement("div");
            musicItem.className =
                "p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer";
            musicItem.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-16 h-12 rounded overflow-hidden relative group">
                            <img src="${music.thumbnail}" alt="${music.title}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <i class="fas fa-play text-white"></i>
                            </div>
                        </div>
                        <div>
                            <p class="font-medium">${music.title}</p>
                            <p class="text-sm text-gray-600">${music.artist}</p>
                        </div>
                    </div>
                    <button class="play-music-btn p-2 bg-red-600 text-white rounded-full" data-index="${index}" data-emotion="${emotion}">
                        <i class="fab fa-youtube"></i>
                    </button>
                </div>
            `;
            musicList.appendChild(musicItem);

            // Add event listener
            const playButton = musicItem.querySelector(".play-music-btn");
            playButton.addEventListener("click", () => {
                this.playMusic(emotion, index);
                modal.classList.add("hidden");
            });

            // Make the entire item clickable
            musicItem.addEventListener("click", (e) => {
                if (!e.target.closest(".play-music-btn")) {
                    this.playMusic(emotion, index);
                    modal.classList.add("hidden");
                }
            });
        });

        // Show modal
        modal.classList.remove("hidden");
    }

    // Fungsi untuk memutar musik
    playMusic(emotion, index) {
        const musicData = this.musicRecommendations[emotion][index];
        const playerContainer = document.getElementById("musicPlayerContainer");
        const musicTitle = document.getElementById("musicTitle");
        const musicArtist = document.getElementById("musicArtist");
        const musicThumbnail = document.getElementById("musicThumbnail");
        const youtubeLink = document.getElementById("openYoutubeLink");

        // Set music info
        musicTitle.textContent = musicData.title;
        musicArtist.textContent = musicData.artist;
        musicThumbnail.src = musicData.thumbnail;
        youtubeLink.href = musicData.url;

        // Show player
        playerContainer.classList.remove("hidden");

        // Set current playing music
        this.currentPlayingMusic = {
            emotion,
            index,
            isPlaying: true,
        };

        window.open(musicData.url, "_blank");
    }

    closePlayer() {
        const playerContainer = document.getElementById("musicPlayerContainer");
        playerContainer.classList.add("hidden");
        this.currentPlayingMusic = null;
    }

    addMessage(message, type) {
        const chatMessages = document.getElementById("chatMessages");
        const messageElement = document.createElement("div");

        messageElement.className =
            type === "user"
                ? "flex justify-end mb-4"
                : "flex justify-start mb-4";

        const bubbleClass =
            type === "user"
                ? "bg-linear-to-l from-[#00C6FF] to-[#0084FF] text-white rounded-2xl rounded-tr-none py-3 px-4 max-w-[80%]"
                : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]";

        messageElement.innerHTML = `
            <div class="${bubbleClass}">
                <p>${this.formatMessage(message)}</p>
            </div>
        `;

        chatMessages.appendChild(messageElement);
        this.messages.push({ message, type });
        this.scrollToBottom();
    }

    formatMessage(message) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return message.replace(
            urlRegex,
            (url) =>
                `<a href="${url}" target="_blank" class="underline">${url}</a>`
        );
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById("chatMessages");
        const typingElement = document.createElement("div");
        typingElement.id = "typingIndicator";
        typingElement.className = "flex justify-start mb-4";
        typingElement.innerHTML = `
            <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById("typingIndicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const chatMessages = document.getElementById("chatMessages");
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    goBack() {
        window.history.back();
    }

    toggleMusic() {
        if (!this.sessionStarted) {
            const chatMessages = document.getElementById("chatMessages");
            const messageElement = document.createElement("div");
            messageElement.className = "flex justify-start mb-4";
            messageElement.innerHTML = `
                <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]">
                    <p>Silakan mulai sesi curhat terlebih dahulu dengan mengklik tombol "Mulai Curhat Sekarang" untuk mendapatkan rekomendasi musik yang sesuai dengan suasana hatimu.</p>
                </div>
            `;
            chatMessages.appendChild(messageElement);
            this.scrollToBottom();
            return;
        }

        if (this.classificationFinal) {
            this.showComprehensiveRecommendations(this.classificationFinal);
            return;
        }

        if (this.lastThreeEmotions.length === 0) {
            const chatMessages = document.getElementById("chatMessages");
            const messageElement = document.createElement("div");
            messageElement.className = "flex justify-start mb-4";
            messageElement.innerHTML = `
                <div class="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none py-3 px-4 max-w-[80%]">
                    <p>Saya belum bisa mendeteksi suasana hatimu dengan jelas. Silakan ceritakan lebih banyak agar saya bisa merekomendasikan musik yang sesuai.</p>
                </div>
            `;
            chatMessages.appendChild(messageElement);
            this.scrollToBottom();
        } else {
            const lastEmotion =
                this.lastThreeEmotions[this.lastThreeEmotions.length - 1];
            this.showMusicRecommendation(lastEmotion);
        }
    }

    startChatSession() {
        this.sessionStarted = true;

        const startChatContainer =
            document.getElementById("startChatContainer");
        if (startChatContainer) {
            startChatContainer.style.display = "none";
        }

        const inputContainer = document.getElementById("inputContainer");
        if (inputContainer) {
            inputContainer.style.display = "block";
        }

        this.addMessage(
            "Halo! Saya adalah asisten virtual MyCareAI. Apa yang bisa saya bantu hari ini? Ceritakan apa yang kamu rasakan, dan setelah beberapa interaksi saya akan memberikan rekomendasi yang sesuai dengan suasana hatimu.",
            "bot"
        );

        setTimeout(() => {
            const messageInput = document.getElementById("messageInput");
            if (messageInput) {
                messageInput.focus();
            }
        }, 500);

        this.resetEmotionData();
        this.totalEmotionClassifications = 0;
        this.classificationFinal = null;

        this.saveToLocalStorage();
    }

    updateUIBasedOnSessionStatus() {
        const startChatContainer =
            document.getElementById("startChatContainer");
        const inputContainer = document.getElementById("inputContainer");

        if (this.sessionStarted) {
            if (startChatContainer) startChatContainer.style.display = "none";
            if (inputContainer) inputContainer.style.display = "block";
        } else {
            if (startChatContainer) startChatContainer.style.display = "flex";
            if (inputContainer) inputContainer.style.display = "none";
        }
    }

    async afterRender() {
        // Inisialisasi elemen-elemen setelah render
        this.messageInput = document.getElementById("messageInput");
        this.sendButton = document.getElementById("sendButton");

        // Tambahkan event listeners untuk input dan tombol kirim
        if (this.messageInput) {
            this.messageInput.addEventListener("input", (e) =>
                this.autoResize(e)
            );
            this.messageInput.addEventListener("keydown", (e) =>
                this.handleKeyPress(e)
            );
        }

        if (this.sendButton) {
            this.sendButton.addEventListener("click", () => this.sendMessage());
        }

        // Tambahkan event listeners untuk tombol mulai curhat
        const startChatButton = document.getElementById("startChatButton");
        if (startChatButton) {
            startChatButton.addEventListener("click", () =>
                this.startChatSession()
            );
        }

        // Tambahkan event listeners untuk tombol lainnya
        const backButton = document.getElementById("backButton");
        if (backButton) {
            backButton.addEventListener("click", () => this.goBack());
        }

        const musicButton = document.getElementById("musicButton");
        if (musicButton) {
            musicButton.addEventListener("click", () => this.toggleMusic());
        }

        // Event listeners untuk modal musik
        const closeModalButton = document.getElementById("closeModalButton");
        if (closeModalButton) {
            closeModalButton.addEventListener("click", () => {
                const modal = document.getElementById(
                    "musicRecommendationModal"
                );
                modal.classList.add("hidden");
            });
        }

        // Event listeners untuk music player
        const playPauseButton = document.getElementById("playPauseButton");
        if (playPauseButton) {
            playPauseButton.addEventListener("click", () =>
                this.togglePlayPause()
            );
        }

        const closePlayerButton = document.getElementById("closePlayerButton");
        if (closePlayerButton) {
            closePlayerButton.addEventListener("click", () =>
                this.closePlayer()
            );
        }

        // Tambahkan CSS untuk animasi typing indicator
        this.addTypingIndicatorStyles();

        // Sembunyikan modal musik saat halaman dimuat
        const musicModal = document.getElementById("musicRecommendationModal");
        if (musicModal) {
            musicModal.classList.add("hidden");
        }

        // Muat data dari localStorage
        this.loadFromLocalStorage();

        // Tambahkan event listener untuk membersihkan localStorage saat halaman ditutup
        // window.addEventListener("beforeunload", () => {
        //     localStorage.removeItem("mycareai_chat_data");
        // });
    }

    // Menambahkan style untuk typing indicator
    addTypingIndicatorStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .typing-indicator {
                display: flex;
                align-items: center;
            }
            .typing-indicator span {
                height: 8px;
                width: 8px;
                background: #606060;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
                animation: bounce 1.5s infinite ease-in-out;
            }
            .typing-indicator span:nth-child(1) {
                animation-delay: 0s;
            }
            .typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }
            .typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
                margin-right: 0;
            }
            @keyframes bounce {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
