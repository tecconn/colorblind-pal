# Colorblind Pal

<img src="./icon.png" alt="Colorblind Pal" width="50" style="display: inline;" />

Google Chrome extension used to transform colors on websites into color-blind friendly pallets.

## Methodology

This tool operates by applying a [feColorMatrix] transformation matrix against the color space of a page.

For example, we may transform the color purple to a more distinguishable color for those who experience Deuteranopia.

Let $x$ be the vector representing the current normalized RGB color code and let $A$ be the transformation matrix to
transform $x$ to a new color friendly space. Use $T(x)=Ax$ to calculate the resulting RGB vector. We calculate the
transformation for the RGB code `rgb(159, 43, 104)` to be `rgb(109, 108, 89)`.

$$
A=\begin{bmatrix}
0.567 & 0.433 & 0 & 0 & 0\\
0.558 & 0.442 & 0 & 0 & 0\\
0 & 0.242 & 0.758 & 0 & 0\\
0 & 0 & 0 & 1 & 0
\end{bmatrix}, x=
\begin{bmatrix}
159/255\\
43/255\\
104/255\\
1\\
\end{bmatrix}
$$

$$
\begin{bmatrix}
0.426\\
0.422\\
0.349\\
1\\
\end{bmatrix}
=
\begin{bmatrix}
0.567 & 0.433 & 0 & 0\\
0.558 & 0.442 & 0 & 0\\
0 & 0.242 & 0.758 & 0\\
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
0.623\\
0.168\\
0.407\\
1\\
\end{bmatrix}
$$


[feColorMatrix]: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix