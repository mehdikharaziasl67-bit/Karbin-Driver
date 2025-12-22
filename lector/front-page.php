<?php
/**
 * The template for displaying the front page.
 *
 * @package Lector
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php
			// Display content from the page set as the front page.
			while ( have_posts() ) : the_post();
				get_template_part( 'template-parts/content', 'page' );
			endwhile; // End of the loop.
			?>

            <div class="home-sections">
                <section class="welcome-section">
                    <h1><?php _e( 'Welcome to Lector', 'lector' ); ?></h1>
                    <p><?php _e( 'Your journey to knowledge starts here.', 'lector' ); ?></p>
                </section>

                <section class="latest-posts-section">
                    <h2><?php _e( 'Latest Articles', 'lector' ); ?></h2>
                    <?php
                    $latest_posts = new WP_Query( array(
                        'posts_per_page' => 5,
                        'ignore_sticky_posts' => 1
                    ) );
                    if ( $latest_posts->have_posts() ) :
                        while ( $latest_posts->have_posts() ) : $latest_posts->the_post();
                            get_template_part( 'template-parts/content', get_post_format() );
                        endwhile;
                        wp_reset_postdata();
                    else :
                        get_template_part( 'template-parts/content', 'none' );
                    endif;
                    ?>
                </section>
            </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
