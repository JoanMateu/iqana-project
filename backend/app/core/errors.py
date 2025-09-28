class BadSourceError(Exception):
    def __init__(self, message="Unsupported source", code="BAD_SOURCE"):
        self.message = message
        self.code = code
        super().__init__(message)

class BadSourceErrorNoCacheData(Exception):
    def __init__(self, message="No cached data available and bad source", code="NO_CACHE_DATA_AND_BAD_SOURCE"):
        self.message = message
        self.code = code
        super().__init__(message)