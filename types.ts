/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video, Chat } from '@google/genai';

/**
 * --- MODEL REFERENCE GUIDE ---
 * 
 * IMAGEN 4 SERIES (Generation Only)
 * Best for: High-fidelity Text-to-Image, Photorealism, Text Rendering inside images.
 * - 'imagen-4.0-generate-001': Standard (Balanced Quality/Cost)
 * - 'imagen-4.0-fast-generate-001': High Speed (Lower Latency)
 * - 'imagen-4.0-ultra-generate-001': Ultra Quality (Highest Fidelity)
 * 
 * GEMINI IMAGE SERIES (Multimodal / Editing)
 * Best for: Image-to-Image, Inpainting, Instruction-based Editing, Reasoning.
 * - 'gemini-2.5-flash-image' (Nano Banana): Fast, efficient, good for standard edits.
 * - 'gemini-3-pro-image-preview' (Nano Banana Pro): Complex reasoning, high-res composition. (Expensive)
 * 
 * VEO SERIES (Video)
 * - 'veo-3.1-fast-generate-preview': Standard generation (720p/1080p).
 * - 'veo-3.1-generate-preview': Reference-based generation.
 */

export enum VeoModel {
  VEO = 'veo-3.1-generate-preview',
  VEO_FAST = 'veo-3.1-fast-generate-preview',
}

export enum ImageModel {
  // Imagen 4 Family
  IMAGEN_4 = 'imagen-4.0-generate-001',
  IMAGEN_4_FAST = 'imagen-4.0-fast-generate-001',
  IMAGEN_4_ULTRA = 'imagen-4.0-ultra-generate-001',
  
  // Gemini Family
  NANO_BANANA_PRO = 'gemini-3-pro-image-preview', // High Cost, High Reasoning
  NANO_BANANA = 'gemini-2.5-flash-image',         // Low Cost, Fast
}

export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  SQUARE = '1:1',
}

export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
}

export enum GenerationMode {
  TEXT_TO_VIDEO = 'Text-to-Video',
  FRAMES_TO_VIDEO = 'Frames-to-Video',
  REFERENCES_TO_VIDEO = 'References-to-Video',
  EXTEND_VIDEO = 'Extend Video',
}

export interface ImageFile {
  file: File;
  base64: string;
}

export interface VideoFile {
  file: File;
  base64: string;
}

export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  mode: GenerationMode;
  startFrame: ImageFile | null;
  endFrame: ImageFile | null;
  referenceImages: ImageFile[];
  styleImage: ImageFile | null;
  inputVideo: VideoFile | null;
  inputVideoObject: Video | null;
  isLooping: boolean;
}

export interface Location {
  id: string | number;
  created_at?: string;
  name: string;
  city: string;
  province: string;
  country: string;
  region: string;
  category: string;
  theme?: string;
  currency: string;
  prompt: {
    visual: string;
    lighting: string;
    atmosphere: string;
    visual_style?: string; // Fallback for legacy data
    [key: string]: any;
  };
  image_urls?: {
    primary: string;
    variants: string[];
    [key: string]: any;
  };
}

export interface Asset {
  id: string;
  name: string;
  publicURL: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  metadata?: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
}

export interface DynamicAsset {
  id: number | string;
  element_type: string;
  name_identifier: string;
  asset_data: {
    prompt?: string;
    style?: string;
    context?: string;
    description?: string;
    role?: string;
    [key: string]: any;
  };
  created_at: string;
  asset_urls: {
    primary: string;
    variants?: string[];
    [key: string]: any;
  } | null;
}

export interface Product {
  id: string;
  product_name: string;
  product_data?: any;
  brand_id?: string;
  created_at?: string;
  image?: any;
  product_url?: string;
  product_insight?: string;
}

export interface BrandIdentity {
  id: string;
  brand_name: string;
  brand_data: any;
  brand_image_url?: string;
  created_at?: string;
}

export interface CalendarEvent {
  event_id: string;
  title: string;
  event_type: 'job_run' | 'deadline' | 'review' | 'launch';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  start_at: string;
  end_at?: string;
  ad_id?: string;
  meta?: any;
  ad?: { ad_title: string };
}

export type InfluencerType = 'human' | 'virtual' | 'ambassador' | 'animated' | 'mascot';
export type InfluencerTier = 'mega' | 'macro' | 'micro' | 'nano' | 'n/a';
export type InfluencerStatus = 'active' | 'inactive' | 'under_review';

export interface CharacterItem {
    id: string;
    type: 'outfit' | 'accessory' | 'bag' | 'watch' | 'belt' | 'prop';
    name: string;
    image_url: string; // This is the plain showcase image
    description: string;
    created_at: string;
    scened_visuals?: { url: string; location_name: string; created_at: string }[];
}

export interface Influencer {
    character_id: string;
    id?: string;
    name: string;
    alias: string;
    role: string;
    description: string;
    powers?: string[];
    affiliation?: string;
    origin_story?: string;
    status: string;
    image_url?: string;
    image_urls_jsonb?: { 
        url: string; 
        type: string; 
        description?: string; 
        features?: string;
        metadata?: any;
    }[];
    character_jsonb?: any;
    character_items?: CharacterItem[] | any; // Supports the new JSONB column
    created_at?: string;
    video_urls?: { url: string; description?: string; created_at?: string }[];
}

export interface MarketInsight {
    id: string;
    title: string;
    type: 'market_trend' | 'consumer_perception' | 'competitive_analysis';
    description: string;
    region: string;
    source?: string;
    quantitative_data?: any;
}

export interface ProjectAsset {
  id: string;
  url: string;
  kind: 'image' | 'video' | 'audio';
  src_url?: string;
  poster_url?: string;
  title?: string;
}

export interface AdScene {
  id: string;
  scene_number: number;
  description: string;
  scene_image_url?: string;
  assets?: ProjectAsset[];
  scene_data?: any;
  feedback?: any;
  logs?: any[]; // Added for production logs
}

export interface Ad {
  id: string;
  ad_title: string;
  target_audience?: string;
  concept?: string;
  ad_images_url?: ProjectAsset[];
  storyboard_urls?: {url: string, prompt: string}[];
  scenes?: AdScene[];
  product_id?: string;
  final_video_url?: string;
  created_at?: string;
  characters?: any[];
  ad_data?: any; // Added for locations, products, etc.
}

export interface DbAd {
  id: string;
  product_id: string;
  ad_title: string;
  ad_style?: string;
  target_audience?: string;
  concept?: string;
  status?: string;
  ad_images_url?: ProjectAsset[];
  storyboard_urls?: {url: string, prompt: string}[];
  final_video_url?: string;
  created_at?: string;
  characters?: any;
}

export interface SceneComposition {
    characters: { id: string; url: string; name: string; type?: string }[];
    location?: { id: string; url: string; name: string; type?: string };
    product?: { id: string; url: string; name: string; type?: string };
}

export interface StudioScene {
  id: string;
  dbId?: string;
  order: number;
  prompt: string;
  startPrompt?: string;
  endPrompt?: string;
  startFrame?: string;
  endFrame?: string;
  videoUrl?: string;
  status: 'idle' | 'generating_image' | 'generating_video' | 'uploading' | 'done' | 'error';
  assignedCharacterId?: string;
  assignedCharacterUrl?: string;
  insights?: string[];
  duration?: number;
  feedback?: any;
  composition?: SceneComposition; // Legacy / Fallback
  startComposition?: SceneComposition;
  endComposition?: SceneComposition;
  audio_spec?: {
      dialogue?: string;
      sfx?: string;
      ambient?: string;
      music?: string;
  };
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'tool';
    text?: string;
    image?: {
        base64: string;
        mimeType: string;
        isSaved?: boolean;
        assetType?: 'character' | 'setting' | 'product' | 'general';
    };
    timestamp: number;
    isToolOutput?: boolean;
}

export interface StoryboardCharacter {
    id: string;
    name: string;
    role: string;
    description: string;
    visual_prompt: string;
    imageUrl?: string;
    status: 'idle' | 'generating' | 'done' | 'error';
}

export interface RefinedPromptResponse {
  improved_prompt: string;
  explanation: string;
  style_notes: string;
}

export interface StoryboardScene {
  scene_number: number;
  description: string;
  visual_prompt: string;
  visual_prompt_start?: string;
  visual_prompt_end?: string;
  assigned_character_name?: string;
  transition_spec?: {
      type: 'cut' | 'continuous' | 'match_cut';
      description: string;
      camera_motion: string;
  };
  audio_spec?: {
      dialogue?: string;
      sfx?: string;
      ambient?: string;
      music?: string;
  };
}

export type ChatSession = Chat;

export type AudioTaskType = 'music' | 'cover' | 'sfx' | 'voice';
export type AudioTaskStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface AudioTask {
  id: string;
  type: AudioTaskType;
  status: AudioTaskStatus;
  created_at: number;
  prompt?: string;
  result_url?: string;
  metadata?: any;
}

export interface Job {
    id: string;
    job_type: string;
    provider: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    request: any;
    results?: any;
    progress?: number;
    created_at: string;
}

export type ContentChannel = 'social' | 'campaign' | 'portfolio' | 'video_reels';
export type ContentType = 'image' | 'video' | 'carousel' | 'story' | 'reel' | 'post';
export type ContentStatus = 'draft' | 'scheduled' | 'queued' | 'generating' | 'ready' | 'posted' | 'failed' | 'cancelled';

export interface ContentItem {
  content_item_id: string;
  character_id: string;
  content_type: ContentType;
  channel: ContentChannel;
  platform?: string;
  status: ContentStatus;
  theme?: string;
  brief?: string;
  meta_jsonb?: {
      scene_id?: string;
      generated_assets?: string[];
      [key: string]: any;
  };
  created_at: string;
  latest_job_status?: string;
}

export interface GenerationJob {
  job_id: string;
  content_item_id: string;
  job_type: string;
  status: 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';
  queued_at: string;
}

export interface SceneSchedule {
  schedule_id: string;
  scene_id: string;
  ad_id?: string;
  character_id?: string;
  scheduled_for: string;
  timezone: string;
  channel: ContentChannel;
  platform: string;
  publish_status: 'draft' | 'scheduled' | 'pending_approval' | 'approved' | 'queued' | 'publishing' | 'posted' | 'failed' | 'cancelled';
  publish_meta?: any;
  requires_approval: boolean;
  approver1_status: string;
  approver2_status: string;
  approver3_status: string;
  scene?: {
      description?: string;
      scene_image_url?: string;
      scene_data?: any;
  };
  character?: {
      name?: string;
      image_url?: string;
      character_id?: string;
  };
}

// --- STORYBOARD STUDIO TYPES ---

export interface SB_Shot {
    id: string;
    order: number;
    camera: string; // "Medium Shot", "Close Up"
    movement: string; // "Dolly In"
    subject: string;
    action: string;
    setting: string;
    lighting: string;
    duration: number;
    visualPrompt?: string; // The composed prompt for AI
    imageUrl?: string; // Generated sketch/animatic
    status: 'draft' | 'locked' | 'generating' | 'done';
    assignedCharacterId?: string; // For consistency
    assignedProductId?: string;
    assignedLocationId?: string;
}

export interface SB_Project {
    id: string;
    title: string;
    concept: string;
    format: 'tvc' | 'social' | 'explainer';
    tone: string;
    shots: SB_Shot[];
    characters: { id: string, name: string, description: string, imageUrl: string }[];
    products: { id: string, name: string, imageUrl: string }[];
    locations: { id: string, name: string, imageUrl: string }[];
}

export interface GaiHairstyle {
    id?: number;
    Name: string;
    Characteristics?: string;
    Display?: string;
    Transformation?: string;
    info_jsonb?: {
        product_id?: string;
        product_name?: string;
        brand_name?: string;
        [key: string]: any;
    };
    images_jsonb?: {
        generated_url?: string;
        product_url?: string;
        [key: string]: any;
    };
    analysis_jsonb?: any;
    ai_images?: any;
    braid_process?: any;
}