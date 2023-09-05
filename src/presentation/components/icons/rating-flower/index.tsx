import React from 'react';

type RatingFlowerProps = {
	width?: number;
	height?: number;
};

export const RatingFlower = ({width = 62, height = 101}: RatingFlowerProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 62 101"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M61.5391 3.77139C60.539 2.85896 59.4112 2.08776 58.1862 1.48458C55.8957 0.356873 53.3472 -0.143159 50.8005 0.0353314L50.7985 0.0354671L50.7966 0.0353315C48.251 -0.142975 45.7035 0.35717 43.4143 1.48492C41.1239 2.61324 39.174 4.32933 37.7639 6.4578C35.0289 10.4034 32.9916 18.1913 38.8085 32.8887L38.8168 32.9097C40.4272 36.9727 45.2847 49.2285 50.8005 49.2285C55.2697 49.2285 59.3115 41.1823 61.5391 35.9676V33.3444C60.6706 35.5165 59.2218 38.9893 57.4093 42.0667C56.3761 43.8208 55.2524 45.3978 54.0862 46.5245C52.9063 47.6645 51.8039 48.2285 50.8005 48.2285C49.7971 48.2285 48.6952 47.6646 47.516 46.5247C46.3504 45.398 45.2275 43.8211 44.195 42.0669C42.1345 38.5664 40.5445 34.5547 39.7406 32.5263L39.7383 32.5207C33.9931 18.0044 36.1091 10.6005 38.5858 7.02749L38.5917 7.01886L38.5975 7.0101C39.9099 5.02919 41.7246 3.43207 43.8562 2.38197C45.9878 1.33189 48.3599 0.866472 50.7303 1.03314L50.7985 0.0628285L50.8668 1.03314C53.2383 0.866289 55.6116 1.33163 57.7444 2.38174C59.1691 3.08319 60.4524 4.02877 61.5391 5.16989V3.77139ZM61.5391 45.5489C59.3837 48.5839 57.8404 51.8173 58.8428 54.0822C59.3016 55.1189 60.2696 55.8972 61.5391 56.4793V55.3647C60.6266 54.8793 60.0378 54.3114 59.7572 53.6775C59.4019 52.8746 59.4573 51.7775 59.9686 50.3855C60.3235 49.4194 60.8708 48.3871 61.5391 47.3371V45.5489ZM61.5391 62.3088C59.7657 62.6258 58.3057 63.24 57.7689 64.3652C56.7315 66.5463 59.3201 70.2533 61.5391 72.8946V71.3118C61.1296 70.7925 60.7245 70.2486 60.3491 69.6964C59.6509 68.6694 59.0873 67.6596 58.7803 66.7618C58.4666 65.8442 58.4757 65.2078 58.6717 64.7952C58.9262 64.2625 59.6644 63.767 61.0468 63.4326C61.2064 63.394 61.3708 63.3585 61.5391 63.3259V62.3088ZM43.5508 78.8993L43.5502 78.9008C42.4607 81.6353 41.4677 84.8419 41.1514 87.9314C40.8348 91.0227 41.2078 93.8682 42.6911 96.0266C43.6445 97.2597 44.8672 98.2589 46.2658 98.9475C47.6719 99.64 49.2181 100 50.7855 100C52.3529 100 53.8993 99.6399 55.3055 98.9475C56.704 98.2589 57.9265 97.2598 58.8799 96.0266C60.3687 93.8608 60.7417 91.0097 60.4239 87.9179C60.1063 84.8279 59.1108 81.6252 58.0215 78.902L57.9832 78.8064C57.4155 77.3884 56.3514 74.7305 54.9885 72.4084C54.2901 71.2185 53.5412 70.166 52.7765 69.4229C52.0053 68.6734 51.3383 68.3535 50.7837 68.3472C50.2289 68.3535 49.5614 68.6735 48.7897 69.4231C48.0245 70.1663 47.2751 71.2187 46.5766 72.4085C45.184 74.7805 44.104 77.5043 43.5529 78.8941L43.5508 78.8993ZM50.767 67.3473L50.7837 67.3472L50.8004 67.3473C54.4928 67.3963 57.7618 75.5625 58.9068 78.4227L58.95 78.5307C61.1646 84.0671 63.0726 91.7257 59.688 96.6162C58.639 97.98 57.2908 99.0846 55.7472 99.8447C54.2037 100.605 52.506 101 50.7855 101C49.0649 101 47.3676 100.605 45.824 99.8447C44.2804 99.0846 42.932 97.98 41.883 96.6162C38.5095 91.7405 40.4067 84.0892 42.6212 78.5307L42.6292 78.5105C43.7302 75.7338 47.036 67.3968 50.767 67.3473ZM50.7837 67.3472L50.767 67.3471H50.8004L50.7837 67.3472ZM31.6147 62.1726H31.7402V63.1726H31.6495C29.0417 63.3554 26.1007 63.7845 23.5112 64.7047C20.909 65.6295 18.7836 67.006 17.6275 69.0009C17.0095 70.2253 16.6788 71.5747 16.6611 72.9462C16.6433 74.3264 16.9428 75.6922 17.5364 76.9384C18.1299 78.1846 19.0018 79.2779 20.0847 80.1338C21.1608 80.9844 22.4167 81.578 23.7568 81.8697C26.025 82.2271 28.4352 81.4484 30.7965 80.0151C33.156 78.5828 35.3555 76.5633 37.1386 74.646L37.1422 74.6422C38.0656 73.6597 39.8676 71.7234 41.2592 69.6745C41.9566 68.6477 42.5192 67.638 42.8254 66.7402C43.1384 65.8224 43.1289 65.1855 42.9325 64.7725L42.9323 64.7721C42.7473 64.3827 42.3007 63.9984 41.4609 63.6817C40.6353 63.3704 39.57 63.179 38.3866 63.0781C36.0239 62.8766 33.4194 63.0516 31.8091 63.1629L31.7402 62.1653C34.9439 61.9438 42.4551 61.4381 43.8355 64.3429C45.2787 67.3769 39.7163 73.3635 37.8709 75.3271C34.239 79.2321 28.7876 83.6944 23.5723 82.8529C22.073 82.531 20.6676 81.8692 19.4646 80.9183C18.2616 79.9674 17.2929 78.7529 16.6335 77.3684C15.9741 75.984 15.6415 74.4666 15.6612 72.9333C15.681 71.4 16.0528 69.8917 16.7477 68.5247C19.3905 63.9258 26.2923 62.5417 31.6147 62.1726ZM11.957 27.4666C12.7112 27.3222 13.4775 27.2505 14.2453 27.2525L14.2428 28.2525C13.5472 28.2507 12.8531 28.3149 12.1696 28.4441C10.1008 28.953 8.17571 29.9286 6.54177 31.2961C4.90137 32.6691 3.59821 34.4004 2.73291 36.3567C1.86758 38.313 1.4631 40.4418 1.55081 42.5791C1.63816 44.708 2.21148 46.7886 3.22666 48.6617C5.28119 52.0046 10.6345 56.4723 24.7921 57.0209L24.7944 57.021C26.776 57.1024 30.6994 57.2603 34.3687 56.8376C36.206 56.626 37.9238 56.2744 39.2808 55.7243C40.6555 55.167 41.5057 54.4699 41.8619 53.6659C42.2181 52.8618 42.1632 51.7637 41.6523 50.3712C41.148 48.9964 40.2542 47.4879 39.1765 45.9851C37.024 42.9836 34.2703 40.1842 32.8777 38.7731L32.877 38.7724C24.4967 30.2646 18.2895 28.2415 14.26 28.2415V27.2415C18.6522 27.2415 25.1003 29.4523 33.5894 38.0706C36.3687 40.8868 44.8136 49.472 42.7762 54.0709C40.7388 58.6699 28.7064 58.1826 24.7534 58.0202C10.3698 57.4628 4.6414 52.8935 2.3604 49.1619C1.26449 47.1486 0.64563 44.9104 0.551647 42.6201C0.457663 40.3298 0.891109 38.0485 1.81838 35.9521C2.74565 33.8558 4.14212 32.0005 5.89995 30.5293C7.65778 29.058 9.73009 28.0102 11.957 27.4666Z"
			fill="#0054B8"
		/>
	</svg>
);
