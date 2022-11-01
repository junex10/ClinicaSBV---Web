enum COMPANY_INFORMATION {
	NAME = 'ClinicaSBV',
	ID = 1,
	DESCRIPTION = 'Sistema para consultoria y administración de la clinica'
}
enum LEVELS {
	ADMIN = 1,
	BOSS = 2,
	DOCTOR = 3,
	SECRETARY = 4,
	PATIENT = 5
}
enum PASSWORD_RESET_STATUS {
	ACTIVE = 1,
	INACTIVE = 0
}

export default {
	COMPANY_INFORMATION,
    CURRENCIES: {
        DOLAR: '$',
        BOLIVAR: 'BS.'
    },
	LEVELS,
	PASSWORD_RESET_STATUS,
	USER: {
		USER_VERIFIED: {
			VERIFIED: 1,
			NO_VERIFIED: 0
		}
	},
	NOTIFICATIONS: {
		STATUS: {
			READED: 1,
			UNREADED: 0
		}
	},
	PER_PAGE: 30,
	PER_PAGE_WEB: 10,
	DAYS: {
		MONDAY: 1,
		TUESDAY: 2,
		WEDNESDAY: 3,
		THURSDAY: 4,
		FRIDAY: 5,
		SATURDAY: 6,
		SUNDAY: 0
	}
}