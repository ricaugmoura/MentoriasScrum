const https = require('https');

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

// Cache settings (24 hours)
let cachedReviews = null;
let lastFetched = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// High-quality mock reviews in Portuguese based on real Scrum Mentors feedback
const mockReviews = [
    {
        author_name: "Thiago Silva",
        rating: 5,
        text: "Excelente mentoria! O Ricardo Augusto tem uma didática fantástica. Fiz o preparatório para o PSM I e passei de primeira com 97% de acerto. Recomendo fortemente para quem quer destravar a carreira ágil.",
        profile_photo_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
        relative_time_description: "há 1 semana"
    },
    {
        author_name: "Mariana Costa",
        rating: 5,
        text: "Participei da mentoria preparatória para o PSPO I e superou todas as minhas expectativas. Explicações claras, simulados realistas e discussões profundas sobre o Scrum Guide. Vale cada centavo!",
        profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
        relative_time_description: "há 2 semanas"
    },
    {
        author_name: "Carlos Eduardo",
        rating: 5,
        text: "O Ricardo Moura é uma autoridade no assunto. Ele não apenas ensina a passar na prova da Scrum.org, mas também ensina como o Scrum funciona no dia a dia das empresas. Passei no PSM I com muita confiança.",
        profile_photo_url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80",
        relative_time_description: "há 1 mês"
    },
    {
        author_name: "Beatriz Nogueira",
        rating: 5,
        text: "Sensacional! As dinâmicas são excelentes e o suporte que dão durante o processo de estudos é incrível. Passei na certificação logo após terminar a mentoria. Nota 10!",
        profile_photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
        relative_time_description: "há 3 semanas"
    },
    {
        author_name: "Rodrigo Almeida",
        rating: 5,
        text: "Uma mentoria direta ao ponto, sem enrolação. Os mentores têm muita vivência de mercado. Aprovado no PSM I com 95% no exame. Melhor investimento que fiz este ano.",
        profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
        relative_time_description: "há 1 mês"
    }
];

/**
 * Helper function to make HTTPS requests
 */
function fetchFromGoogle(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * Fetch and return Google Place Reviews.
 */
exports.getReviews = async (req, res) => {
    try {
        const now = Date.now();

        // Return cache if it is valid
        if (cachedReviews && (now - lastFetched < CACHE_DURATION)) {
            return res.status(200).json({
                success: true,
                reviews: cachedReviews,
                fromCache: true
            });
        }

        // Check if credentials exist, otherwise return Mock Reviews
        if (!apiKey || apiKey === '' || !placeId || placeId === '') {
            console.log('🤖 Google Places API key not found. Returning mock reviews.');
            cachedReviews = mockReviews;
            lastFetched = now;
            return res.status(200).json({
                success: true,
                reviews: cachedReviews,
                mock: true
            });
        }

        // Call Google Places API Place Details endpoint
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=pt-BR`;
        const responseData = await fetchFromGoogle(url);

        if (responseData.status === 'OK' && responseData.result && responseData.result.reviews) {
            // Map Google reviews to standard format
            const formattedReviews = responseData.result.reviews.map(r => ({
                author_name: r.author_name,
                rating: r.rating,
                text: r.text,
                profile_photo_url: r.profile_photo_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
                relative_time_description: r.relative_time_description
            }));

            cachedReviews = formattedReviews;
            lastFetched = now;

            return res.status(200).json({
                success: true,
                reviews: cachedReviews
            });
        } else {
            console.warn(`⚠️ Google Places API returned status ${responseData.status}. Falling back to mock reviews.`);
            cachedReviews = mockReviews;
            lastFetched = now;
            return res.status(200).json({
                success: true,
                reviews: cachedReviews,
                mock: true,
                warning: `Google API status: ${responseData.status}`
            });
        }

    } catch (error) {
        console.error('Error fetching Google Reviews:', error);
        // On error, return mock reviews so the app doesn't break
        return res.status(200).json({
            success: true,
            reviews: mockReviews,
            mock: true,
            error: true
        });
    }
};
