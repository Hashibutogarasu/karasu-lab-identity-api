export interface IDatabaseSeedingService {
	seed(): Promise<void>;
}
