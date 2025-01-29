### Cool Designs.

1. Adding a fade layer to my components.
   usage: <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
   definition:
   - .fade-layer {
     mask-image: linear-gradient(
     to top,
     rgba(0, 0, 0, 0),
     rgba(0, 0, 0, 1) 20%,
     rgba(0, 0, 0, 1) 80%,
     rgba(0, 0, 0, 0)
     );
     }
   - .fade-layer--side {
     mask-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%);
     }
2. Use a global card component to create an Upgrade card at the bottom of my sidebar component. - Like in chatGPT.
