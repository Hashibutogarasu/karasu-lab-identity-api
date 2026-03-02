import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { readConfigContent } from './config.util.js';

describe('readConfigContent utility', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'config-util-test-'));
		vi.spyOn(process, 'cwd').mockReturnValue(tempDir);
	});

	afterEach(() => {
		fs.rmSync(tempDir, { recursive: true, force: true });
		vi.restoreAllMocks();
	});

	it('should return file content when file exists', () => {
		const mockContent = '{"adminUserIds": ["user1"]}';
		const configSubDir = path.join(tempDir, 'configs');
		fs.mkdirSync(configSubDir);
		const configPath = path.join(configSubDir, 'config.json');
		fs.writeFileSync(configPath, mockContent);

		const result = readConfigContent('configs', 'config.json');

		expect(result).toBe(mockContent);
	});

	it('should return null when file does not exist', () => {
		const result = readConfigContent('non-existent.json');

		expect(result).toBeNull();
	});

	it('should return null when path is a directory', () => {
		const configSubDir = path.join(tempDir, 'configs');
		fs.mkdirSync(configSubDir);

		const result = readConfigContent('configs');

		expect(result).toBeNull();
	});
});
