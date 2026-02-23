// Mock service for Meet Videos with Vimeo links
// This simulates a paginated API response with Vimeo video links
// API contract: returns only videoUrl, title, and duration
// https://player.vimeo.com/video/724634693?color=655CD6
class MockMeetVideosService {
  constructor() {
    this.mockVideos = [
      {
        id: 1,
        title: 'Apresentação Belinha',
        videoUrl: '724634693',
        duration: 33,
      },
      {
        id: 2,
        title: 'Apresentação Eve',
        videoUrl: '724847550',
        duration: 28,
      },
      {
        id: 3,
        title: 'Apresentação Eugênio',
        videoUrl: '724843253',
        duration: 18,
      },
      {
        id: 4,
        title: 'Apresentação Chico',
        videoUrl: '724841745',
        duration: 24,
      },
      {
        id: 5,
        title: 'Apresentação Zeca',
        videoUrl: '724855839',
        duration: 30,
      },
      {
        id: 6,
        title: 'Apresentação Nietche',
        videoUrl: '724850241',
        duration: 30,
      },
      {
        id: 7,
        title: 'Apresentação Clara',
        videoUrl: '724842795',
        duration: 21,
      },
      {
        id: 8,
        title: 'Apresentação Junior',
        videoUrl: '724848352',
        duration: 28,
      },
      {
        id: 9,
        title: '1 - Apresentação Belinha',
        videoUrl: '629111077',
        duration: 18,
      },
    ]
  }

  // Get paginated videos with filters
  async getMeetVideos(filters = {}) {
    const { page = 1, limit = 10 } = filters

    // Calculate pagination
    const totalItems = this.mockVideos.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedVideos = this.mockVideos.slice(startIndex, endIndex)

    // Simulate API response structure
    return {
      status: 200,
      data: {
        data: paginatedVideos,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
    }
  }
}

// Export singleton instance
export default new MockMeetVideosService()
