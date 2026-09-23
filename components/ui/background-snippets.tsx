/**
 * Background Snippets — white grid + purple radial glow.
 * Usage: Place inside a `relative` positioned container.
 * The div is absolutely positioned and sits behind all content (-z-10).
 */
export const Component = () => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ffedd5,transparent)]"></div>
    </div>
  );
};
