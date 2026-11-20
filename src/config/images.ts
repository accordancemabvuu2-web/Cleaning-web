/**
 * SINGLE SOURCE OF TRUTH FOR PHOTOGRAPHY
 *
 * Every entry points at an optimised derivative in `public/images`, generated
 * from the original camera files that remain untouched in `public/`.
 * Keeping the path, alt text and intrinsic size together means no component
 * has to guess a filename or repeat the same description twice.
 */

export interface SiteImage {
  /** Public URL of the optimised file. */
  src: string;
  /** Descriptive alt text for screen readers. */
  alt: string;
  /** Intrinsic width in pixels, used to reserve layout space. */
  width: number;
  /** Intrinsic height in pixels, used to reserve layout space. */
  height: number;
}

export const images = {
  /** Two cleaners working through a finished, furnished living room. */
  cleaningCrew: {
    src: '/images/cleaning-crew-living-room.jpg',
    alt: 'Two cleaners vacuuming and mopping the floor of a finished, furnished living room',
    width: 1600,
    height: 1067,
  },
  /** Completed modern residential development with landscaping. */
  residentialDevelopment: {
    src: '/images/residential-development.jpg',
    alt: 'Completed low-rise residential development with brick façade and landscaped frontage',
    width: 1000,
    height: 1778,
  },
  /** Cleaner working on the façade of a high-rise building. */
  highRise: {
    src: '/images/high-rise-window-cleaning.jpg',
    alt: 'Cleaner working on the exterior glazing of a high-rise residential building',
    width: 1000,
    height: 1500,
  },
  /** Crew clearing construction debris and dust from a slab. */
  constructionCleanup: {
    src: '/images/construction-cleanup-crew.jpg',
    alt: 'Cleaning crew sweeping construction debris and dust from a concrete slab',
    width: 1600,
    height: 1067,
  },
  /** Keys being handed from one person to another. */
  handoverKeys: {
    src: '/images/handover-keys.jpg',
    alt: 'One person handing a set of keys to another at the end of a project',
    width: 1000,
    height: 1000,
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
