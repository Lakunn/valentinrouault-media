<?php
/**
 * Accueil du média : à la une, manifeste (contenu de la page d'accueil), rubriques, newsletter.
 */
get_header();

$vr_seen = array();
$vr_lead = new WP_Query(
	array(
		'posts_per_page'      => 5,
		'ignore_sticky_posts' => false,
		'no_found_rows'       => true,
	)
);
?>
<?php
$vr_profile = vr_config( 'home.profile' );
if ( $vr_profile ) :
	$vr_da    = array_filter( (array) vr_config( 'home.da', array() ) );
	$vr_style = '';
	foreach ( array( 'background' => '--hero-bg', 'text' => '--hero-ink', 'accent' => '--hero-accent', 'font_heading' => '--hero-font-h', 'font_body' => '--hero-font-b' ) as $vr_k => $vr_var ) {
		if ( ! empty( $vr_da[ $vr_k ] ) ) {
			$vr_style .= $vr_var . ':' . preg_replace( '/[^#\w\s,\-"\'().%]/', '', $vr_da[ $vr_k ] ) . ';';
		}
	}
	$vr_bio = '';
	if ( have_posts() ) {
		the_post();
		ob_start();
		the_content();
		$vr_bio = ob_get_clean();
		rewind_posts();
	}
	?>
<section class="home-hero<?php echo $vr_da ? ' has-da' : ''; ?>"<?php echo $vr_style ? ' style="' . esc_attr( $vr_style ) . '"' : ''; ?>>
	<div class="wrap hero-grid">
		<div class="hero-main">
			<span class="kicker"><?php echo esc_html( $vr_profile['kicker'] ?? '' ); ?></span>
			<h1><?php echo esc_html( vr_config( 'home.h1', vr_config( 'brand.name' ) ) ); ?></h1>
			<p class="hero-title"><?php echo esc_html( $vr_profile['title'] ?? '' ); ?></p>
			<div class="hero-bio"><?php echo wp_kses_post( $vr_bio ); ?></div>
			<?php if ( ! empty( $vr_profile['current'] ) ) : ?>
				<p class="hero-current"><?php echo wp_kses( $vr_profile['current'], array( 'a' => array( 'href' => array(), 'rel' => array() ) ) ); ?></p>
			<?php endif; ?>
		</div>
		<?php if ( ! empty( $vr_profile['stats'] ) ) : ?>
		<ul class="hero-stats" aria-label="Chiffres clés">
			<?php foreach ( $vr_profile['stats'] as $vr_stat ) : ?>
				<li><strong><?php echo esc_html( $vr_stat['value'] ); ?></strong><span><?php echo esc_html( $vr_stat['label'] ); ?></span></li>
			<?php endforeach; ?>
			<?php if ( ! empty( $vr_profile['stats_note'] ) ) : ?>
				<li class="hero-note"><?php echo esc_html( $vr_profile['stats_note'] ); ?></li>
			<?php endif; ?>
		</ul>
		<?php endif; ?>
	</div>
	<?php if ( ! empty( $vr_profile['clients'] ) ) : ?>
	<div class="hero-clients">
		<div class="wrap">
			<p class="hero-clients-title"><?php echo esc_html( $vr_profile['clients_title'] ?? '' ); ?></p>
			<ul>
				<?php foreach ( $vr_profile['clients'] as $vr_client ) : ?>
					<li><?php echo esc_html( $vr_client ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
	<?php endif; ?>
</section>
<?php endif; ?>
<div class="wrap">
	<?php if ( ! $vr_profile ) : ?>
	<h1 class="screen-reader-text"><?php echo esc_html( vr_config( 'home.h1', vr_config( 'brand.name' ) ) ); ?></h1>
	<?php endif; ?>

	<?php if ( $vr_lead->have_posts() ) : ?>
	<section class="lead" aria-label="À la une">
		<h2 class="screen-reader-text">Derniers articles</h2>
		<div class="lead-main">
			<?php
			$vr_lead->the_post();
			$vr_seen[] = get_the_ID();
			get_template_part( 'template-parts/card', null, array( 'heading' => 'h2' ) );
			?>
		</div>
		<div class="lead-side">
			<h2 class="side-title">Aussi à lire</h2>
			<?php
			while ( $vr_lead->have_posts() ) :
				$vr_lead->the_post();
				$vr_seen[] = get_the_ID();
				get_template_part(
					'template-parts/card',
					null,
					array(
						'show_media'   => false,
						'show_excerpt' => false,
					)
				);
			endwhile;
			?>
		</div>
	</section>
		<?php
		wp_reset_postdata();
	endif;
	?>

	<?php
	// Manifeste : contenu de la page définie comme page d'accueil (content/pages/accueil.md).
	if ( ! $vr_profile && have_posts() ) :
		while ( have_posts() ) :
			the_post();
			if ( '' !== trim( get_the_content() ) ) :
				?>
	<section class="manifesto">
		<h2><?php echo esc_html( vr_config( 'home.manifesto_title', 'Le média' ) ); ?></h2>
		<div class="prose"><?php the_content(); ?></div>
	</section>
				<?php
			endif;
		endwhile;
	endif;
	?>

	<?php
	foreach ( (array) vr_config( 'categories', array() ) as $vr_conf ) :
		if ( empty( $vr_conf['on_home'] ) ) {
			continue;
		}
		$vr_term = get_category_by_slug( $vr_conf['slug'] );
		if ( ! $vr_term ) {
			continue;
		}
		$vr_q = new WP_Query(
			array(
				'cat'                 => $vr_term->term_id,
				'posts_per_page'      => 3,
				'post__not_in'        => $vr_seen,
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
			)
		);
		if ( ! $vr_q->have_posts() ) {
			continue;
		}
		?>
	<section class="section" aria-labelledby="sec-<?php echo esc_attr( $vr_term->slug ); ?>">
		<div class="section-head">
			<div>
				<h2 id="sec-<?php echo esc_attr( $vr_term->slug ); ?>"><?php echo esc_html( $vr_term->name ); ?></h2>
				<?php if ( ! empty( $vr_conf['tagline'] ) ) : ?>
					<p><?php echo esc_html( $vr_conf['tagline'] ); ?></p>
				<?php endif; ?>
			</div>
			<a class="more" href="<?php echo esc_url( get_term_link( $vr_term ) ); ?>">Toute la rubrique →</a>
		</div>
		<div class="grid">
			<?php
			while ( $vr_q->have_posts() ) :
				$vr_q->the_post();
				$vr_seen[] = get_the_ID();
				get_template_part( 'template-parts/card' );
			endwhile;
			wp_reset_postdata();
			?>
		</div>
	</section>
	<?php endforeach; ?>

	<?php get_template_part( 'template-parts/newsletter' ); ?>
</div>
<?php
get_footer();
