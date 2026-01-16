import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_REPO_OWNER || '';
const repo = process.env.GITHUB_REPO_NAME || '';
const branch = process.env.GITHUB_BRANCH || 'main';

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * Upload an image to GitHub repository
 * @param file - The file to upload (File object)
 * @param path - Target path in repo (e.g., 'public/images/events/my-image.jpg')
 * @returns Upload result with public URL
 */
export async function uploadImageToGitHub(
  file: File,
  path: string
): Promise<UploadResult> {
  try {
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const content = buffer.toString('base64');

    // Check if file already exists
    let sha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      if ('sha' in data) {
        sha = data.sha;
      }
    } catch (error) {
      // File doesn't exist, which is fine
    }

    // Create or update file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Upload image: ${file.name}`,
      content,
      branch,
      ...(sha && { sha }),
    });

    // Generate public URL (assuming deployed on Vercel or similar)
    const publicPath = path.replace('public/', '/');
    
    return {
      success: true,
      url: publicPath,
      path: path,
    };
  } catch (error) {
    console.error('GitHub upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete an image from GitHub repository
 * @param path - Path of the file to delete
 */
export async function deleteImageFromGitHub(
  path: string
): Promise<UploadResult> {
  try {
    // Get file SHA
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (!('sha' in data)) {
      return {
        success: false,
        error: 'File not found',
      };
    }

    // Delete file
    await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `Delete image: ${path}`,
      sha: data.sha,
      branch,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('GitHub delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate a unique filename for uploaded images
 */
export function generateImageFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const cleanName = originalName
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .substring(0, 30);
  
  return `${cleanName}-${timestamp}-${randomStr}.${extension}`;
}
