// API service for fetching real-time anime data
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

class AnimeApiService {

    // Fetch trending/popular anime
    static async getTrendingAnime(limit = 25) {
        try {
            const response = await fetch(`${JIKAN_BASE_URL}/top/anime?type=tv&limit=${Math.min(limit, 25)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Raw API Response - Trending Anime:', data);

            // Transform API data to match your app's structure
            const transformedMovies = data.data.map(anime => {
                const trailerUrl = anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null);
                
                // Debug trailer info
                if (anime.title.includes('Fullmetal') || anime.title.includes('Frieren')) {
                    
                }
                
                return {
                    id: anime.mal_id,
                    title: anime.title,
                    image: anime.images.jpg.large_image_url,
                    genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                    rating: anime.score ? anime.score.toString() : '7.5',
                    trailerUrl: trailerUrl,
                    year: anime.year || new Date().getFullYear(),
                    synopsis: anime.synopsis,
                    episodes: anime.episodes,
                    status: anime.status,
                    studios: anime.studios.map(studio => studio.name).join(', ')
                };
            });

            return transformedMovies;

        } catch (error) {
            console.error('❌ Error fetching trending anime:', error);
            return [];
        }
    }

    // Fetch anime by season (current season)
    static async getCurrentSeasonAnime(limit = 25) {
        try {
            const response = await fetch(`${JIKAN_BASE_URL}/seasons/now?limit=${Math.min(limit, 25)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const transformedMovies = data.data.map(anime => ({
                id: anime.mal_id,
                title: anime.title,
                image: anime.images.jpg.large_image_url,
                genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                rating: anime.score ? anime.score.toString() : '7.5',
                trailerUrl: anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null),
                year: anime.year || new Date().getFullYear(),
                synopsis: anime.synopsis,
                episodes: anime.episodes,
                status: anime.status,
                airing: anime.airing
            }));

            return transformedMovies;

        } catch (error) {
            console.error('❌ Error fetching current season anime:', error);
            return [];
        }
    }

    // Search anime by query
    static async searchAnime(query, limit = 25) {
        try {

            const response = await fetch(`${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${Math.min(limit, 25)}&order_by=score&sort=desc`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const transformedMovies = data.data.map(anime => ({
                id: anime.mal_id,
                title: anime.title,
                image: anime.images.jpg.large_image_url,
                genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                rating: anime.score ? anime.score.toString() : '7.5',
                trailerUrl: anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null),
                year: anime.year || new Date().getFullYear(),
                synopsis: anime.synopsis
            }));

            return transformedMovies;

        } catch (error) {
            console.error('❌ Error searching anime:', error);
            return [];
        }
    }

    // Get random anime recommendations
    static async getRandomAnime() {
        try {
            const response = await fetch(`${JIKAN_BASE_URL}/random/anime`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('🎲 Random Anime:', data);

            const anime = data.data;
            const transformedAnime = {
                id: anime.mal_id,
                title: anime.title,
                image: anime.images.jpg.large_image_url,
                genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                rating: anime.score ? anime.score.toString() : '7.5',
                trailerUrl: anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null),
                year: anime.year || new Date().getFullYear(),
                synopsis: anime.synopsis
            };

            return transformedAnime;

        } catch (error) {
            console.error('❌ Error fetching random anime:', error);
            return null;
        }
    }

    // Fetch anime by genre
    static async getAnimeByGenre(genreId, limit = 25) {
        try {
            // Try the primary approach first
            let response;
            try {
                response = await fetch(`${JIKAN_BASE_URL}/anime?genres=${genreId}&limit=${Math.min(limit, 25)}&order_by=score&sort=desc`);
            } catch (fetchError) {
                // Alternative approach without sorting
                response = await fetch(`${JIKAN_BASE_URL}/anime?genres=${genreId}&limit=${Math.min(limit, 25)}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return [];
            }

            const transformedMovies = data.data.map(anime => ({
                id: anime.mal_id,
                title: anime.title,
                image: anime.images.jpg.large_image_url,
                genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                rating: anime.score ? anime.score.toString() : '7.5',
                trailerUrl: anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null),
                year: anime.year || new Date().getFullYear(),
                synopsis: anime.synopsis,
                episodes: anime.episodes,
                status: anime.status,
                studios: anime.studios.map(studio => studio.name).join(', ')
            }));

            return transformedMovies;

        } catch (error) {
            console.error(`❌ Error fetching genre ${genreId}:`, error);
            return [];
        }
    }

    // Get categorized anime data for landing page - Single API call approach
    static async getCategorizedAnimeData() {
        try {
            // Make one comprehensive API call for top anime (max limit is 25)
            const response = await fetch(`${JIKAN_BASE_URL}/top/anime?type=tv&limit=25`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                throw new Error('No anime data received');
            }

            // Transform all data first
            const allAnime = data.data.map(anime => ({
                id: anime.mal_id,
                title: anime.title,
                image: anime.images.jpg.large_image_url,
                genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                genres: anime.genres.map(g => g.name.toLowerCase()), // Keep all genres for better filtering
                rating: anime.score ? anime.score.toString() : '7.5',
                trailerUrl: anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null),
                year: anime.year || new Date().getFullYear(),
                synopsis: anime.synopsis || '',
                episodes: anime.episodes,
                status: anime.status,
                studios: anime.studios?.map(studio => studio.name).join(', ') || '',
                score: anime.score || 0
            }));

            // Filter into categories using the single dataset (get all available data)
            const categories = {
                popular: allAnime
                    .sort((a, b) => b.score - a.score), // Sort by score for popular

                action: allAnime
                    .filter(anime => 
                        anime.genres.includes('action') || 
                        anime.genres.includes('adventure') ||
                        anime.genres.includes('shounen') ||
                        anime.title.toLowerCase().includes('fight') ||
                        anime.synopsis.toLowerCase().includes('battle')
                    ),

                romance: allAnime
                    .filter(anime => 
                        anime.genres.includes('romance') ||
                        anime.genres.includes('shoujo') ||
                        anime.genres.includes('drama') ||
                        anime.title.toLowerCase().includes('love') ||
                        anime.title.toLowerCase().includes('romance') ||
                        anime.synopsis.toLowerCase().includes('love') ||
                        anime.synopsis.toLowerCase().includes('romance') ||
                        anime.synopsis.toLowerCase().includes('relationship')
                    ),

                comedy: allAnime
                    .filter(anime => 
                        anime.genres.includes('comedy') ||
                        anime.genres.includes('parody') ||
                        anime.genres.includes('gag humor') ||
                        anime.title.toLowerCase().includes('funny') ||
                        anime.synopsis.toLowerCase().includes('comedy') ||
                        anime.synopsis.toLowerCase().includes('humor')
                    ),

                currentSeason: allAnime
                    .filter(anime => anime.year >= 2024) // Recent anime
                    .sort((a, b) => b.year - a.year)
            };

            // Fallback logic if any category is empty (using smaller thresholds)
            if (categories.action.length < 3) {
                categories.action = [...categories.action, ...allAnime.slice(0, 10)];
            }
            
            if (categories.romance.length < 3) {
                categories.romance = [...categories.romance, ...allAnime.slice(5, 15)];
            }
            
            if (categories.comedy.length < 3) {
                categories.comedy = [...categories.comedy, ...allAnime.slice(10, 20)];
            }

            if (categories.currentSeason.length < 3) {
                categories.currentSeason = [...categories.currentSeason, ...allAnime.slice(15, 25)];
            }

            return categories;

        } catch (error) {
            console.error('❌ Error loading categorized anime data:', error);
            
            // Fallback to existing mixed data approach
            const fallbackData = await this.getMixedAnimeData().catch(() => []);
            
            return {
                popular: fallbackData,
                action: fallbackData.filter(anime => anime.genre === 'action'),
                romance: fallbackData.filter(anime => 
                    anime.genre === 'romance' || 
                    anime.genre === 'drama' ||
                    anime.title.toLowerCase().includes('love')
                ),
                comedy: fallbackData.filter(anime => anime.genre === 'comedy'),
                currentSeason: fallbackData.slice(0, 15)
            };
        }
    }

    // Get mixed anime data from single source (no multiple API calls)
    static async getMixedAnimeData() {
        try {
            // Single API call - same as getCategorizedAnimeData but without categorization
            const response = await fetch(`${JIKAN_BASE_URL}/top/anime?type=tv&limit=25`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return [];
            }

            // Transform data to match app structure
            const transformedMovies = data.data.map(anime => {
                const trailerUrl = anime.trailer?.embed_url || 
                    (anime.trailer?.youtube_id ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}` : null);
                
                // Debug trailer info for specific anime
                if (anime.title.includes('Fullmetal') || anime.title.includes('Frieren') || anime.title.includes('Steins')) {

                }
                
                return {
                    id: anime.mal_id,
                    title: anime.title,
                    image: anime.images.jpg.large_image_url,
                    genre: anime.genres.length > 0 ? anime.genres[0].name.toLowerCase() : 'action',
                    rating: anime.score ? anime.score.toString() : '7.5',
                    trailerUrl: trailerUrl,
                    year: anime.year || new Date().getFullYear(),
                    synopsis: anime.synopsis || '',
                    episodes: anime.episodes,
                    status: anime.status,
                    studios: anime.studios?.map(studio => studio.name).join(', ') || ''
                };
            });

            // Shuffle array for variety
            const shuffled = transformedMovies.sort(() => Math.random() - 0.5);

            return shuffled;

        } catch (error) {
            console.error('❌ Error loading mixed anime data:', error);
            return [];
        }
    }
}

export default AnimeApiService;